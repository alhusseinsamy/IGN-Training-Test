import { http, status } from "@gatling.io/http";

export const homePage = http("Homepage").get("https://ecomm.gatling.io").check(status().is(200));

export const loginPage = http("Login page")
  .get("https://ecomm.gatling.io/login")
  .check(status().is(200));
