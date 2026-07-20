import { exec } from "@gatling.io/core";

export const setPageNumber = exec((session) => session.set("pageNumber", "0"));
export const setSearchKey = exec((session) => session.set("searchKey", ""));

export const createAddToCartBody = exec((session) => {
  const productList = JSON.parse(session.get("products"));
  const randomProduct = productList[Math.floor(Math.random() * productList.length)];
  const cartItems = JSON.stringify([randomProduct]);
  return session.set("cartItems", cartItems);
});

export const createAddToCartBodyForLoop = exec((session) => {
  console.log("pagenum: ", session.get("pageNumber"));
  console.log("contains: ", session.contains("cartItems"));
  const productList = JSON.parse(session.get("products"));
  const randomProduct = productList[Math.floor(Math.random() * productList.length)];

  const cartItems = session.contains("cartItems") ? JSON.parse(session.get("cartItems")) : [];
  // console.log("cartItems: ", cartItems);
  cartItems.push(randomProduct);

  return session.set("cartItems", JSON.stringify(cartItems));
});

export const removePageNumberFromSession = exec((session) => session.remove("pageNumber"));
