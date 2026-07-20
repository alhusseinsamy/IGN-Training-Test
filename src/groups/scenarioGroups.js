import { feed, group, jsonFile } from "@gatling.io/core";
import { addToCart, checkout, login, products, session } from "../endpoints/apiEndpoints";
import { homePage, loginPage } from "../endpoints/websiteEndpoints";
import { createAddToCartBody, setPageNumber, setSearchKey } from "../actions/actions";

const usersfeeder = jsonFile("data/users.json").circular();

export const homePageGroup = group("Homepage Group").on(
  session,
  homePage,
  setPageNumber,
  setSearchKey,
  products
);

export const loginGroup = group("Login Group").on(loginPage, feed(usersfeeder), login);

export const browseAndAddToCart = group("Browse and add to cart Group").on(
  products,
  createAddToCartBody,
  addToCart,
  checkout
);
