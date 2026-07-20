import { http, status } from "@gatling.io/http";

export const session = http("Session").get("/session").check(status().is(200));

export const products = http("Products")
  .get("/products")
  .queryParam("page", "#{pageNumber}")
  .queryParam("search", "#{searchKey}")
  .check(status().is(200));
