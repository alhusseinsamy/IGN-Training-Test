import { atOnceUsers, getParameter, global, scenario, simulation } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { browseAndAddToCart, homePageGroup, loginGroup } from "./groups/scenarioGroups";

export default simulation((setUp) => {
  // Load VU count from system properties
  // Reference: https://docs.gatling.io/guides/passing-parameters/
  const vu = parseInt(getParameter("vu", "1"));
  const testType = getParameter("testType", "smoke");
  const duration = parseInt(getParameter("duration", "10"));

  // Define HTTP configuration
  // Reference: https://docs.gatling.io/reference/script/protocols/http/protocol/
  const httpProtocol = http
    .baseUrl("https://api-ecomm.gatling.io")
    .acceptHeader("application/json")
    .userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    );

  // Define scenario
  // Reference: https://docs.gatling.io/reference/script/core/scenario/
  const scn = scenario("Scenario").exec(homePageGroup, loginGroup, browseAndAddToCart);

  // Define assertions
  // Reference: https://docs.gatling.io/reference/script/core/assertions/
  const assertions = [
    global().responseTime().percentile(90).lt(500),
    global().failedRequests().percent().lt(5)
  ];

  const injectionProfile = () => {
    switch (testType) {
      case "stress":
        return scn.injectOpen(stressPeakUsers(vu).during(duration));
      case "smoke":
        return scn.injectOpen(atOnceUsers(1));
      default:
        return scn.injectOpen(atOnceUsers(vu));
    }
  };

  const getAssertions = () => {
    switch (testType) {
      case "stress":
        return assertions;
      case "smoke":
        return [global().failedRequests().count().lt(1)];
      default:
        return [global().failedRequests().count().lt(1)];
    }
  };

  // Define injection profile and execute the test
  // Reference: https://docs.gatling.io/reference/script/core/injection/
  setUp(injectionProfile())
    .assertions(...getAssertions())
    .protocols(httpProtocol);
});
