import {
  REMOVE_PRODUCTS_FROM_WATCHLIST_API,
} from "./backendApi";

export const addToWatchList = (id) => {
  if (localStorage.getItem("auction-watchlist")) {
    localStorage.setItem(
      "auction-watchlist",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("auction-watchlist")),
        id,
      ])
    );
  } else {
    localStorage.setItem("auction-watchlist", JSON.stringify([id]));
  }
  return [...JSON.parse(localStorage.getItem("auction-watchlist"))];
};
export const removeFromWatchList = async (id) => {
 
  let updatedWatchList = JSON.parse(
    localStorage.getItem("auction-watchlist")
  ).filter((prodId) => prodId !== id);
  localStorage.setItem(
    "auction-watchlist",
    JSON.stringify([...updatedWatchList])
  );
  return [...updatedWatchList];
};

export const allLocalStorageKeys = () => {
  return ["auction-user-details", "auction-watchlist"];
};
