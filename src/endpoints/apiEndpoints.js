import { ElFileBody, RawFileBody, StringBody } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export const session = http("Session").get("/session").check(status().is(200));

export const products = http("Products")
  .get("/products")
  .queryParam("page", "#{pageNumber}")
  .queryParam("search", "#{searchKey}")
  .check(status().is(200));

export const login = http("Login")
  .post("/login")
  .formParam("username", "admin")
  .formParam("password", "gatling")
  .check(status().is(200));

export const login1 = http("Login")
  .post("/login")
  .body(RawFileBody("loginBody.txt"))
  .header("content-type", "application/x-www-form-urlencoded")
  .check(status().is(200));
