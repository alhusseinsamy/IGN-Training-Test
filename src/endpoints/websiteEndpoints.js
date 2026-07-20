import { http, status } from "@gatling.io/http";

export const homePage = http("Homepage").get("https://ecomm.gatling.io").check(status().is(200));
