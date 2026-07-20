import { ElFileBody, jmesPath, RawFileBody, StringBody } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

export const session = http("Session")
  .get("/session")
  .check(status().is(200))
  .check(jmesPath("sessionId").saveAs("sessionId"));

export const products = http("Products")
  .get("/products")
  .queryParam("page", "#{pageNumber}")
  .queryParam("search", "#{searchKey}")
  .check(status().is(200))
  .check(jmesPath("products").saveAs("products"));

export const login = http("Login")
  .post("/login")
  .formParam("username", "#{username}")
  .formParam("password", "#{password}")
  .check(jmesPath("accessToken").saveAs("accessToken"))
  .check(status().is(200));

export const login1 = http("Login")
  .post("/login")
  .body(RawFileBody("loginBody.txt"))
  .header("content-type", "application/x-www-form-urlencoded")
  .check(status().is(200));

export const addToCart = http("Add to cart")
  .post("/cart")
  .body(ElFileBody("bodies/cart.json"))
  .check(status().is(200));

export const checkout = http("Checkout")
  .post("/checkout")
  .body(ElFileBody("bodies/cart.json"))
  .header("Authorization", "#{accessToken}")
  .check(status().is(200));
