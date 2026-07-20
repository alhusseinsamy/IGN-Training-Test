import { feed, group, jsonFile, repeat } from "@gatling.io/core";
import { addToCart, checkout, login, products, session } from "../endpoints/apiEndpoints";
import { homePage, loginPage } from "../endpoints/websiteEndpoints";
import {
  createAddToCartBody,
  createAddToCartBodyForLoop,
  removePageNumberFromSession,
  setPageNumber,
  setSearchKey
} from "../actions/actions";

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
  setPageNumber,
  setSearchKey,
  products,
  createAddToCartBody,
  addToCart,
  checkout
);

export const browseAllPagesAndAddToCart = group("Browse All Pages").on(
  setSearchKey,
  removePageNumberFromSession,
  repeat(4, "pageNumber").on(products, createAddToCartBodyForLoop, addToCart),
  checkout
);
