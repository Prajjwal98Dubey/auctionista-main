import { useEffect, useState } from "react";
import {
  BATCH_WATCHLIST_PRODUCTS_API,
  SINGLE_PRODUCTS_API,
} from "../helpers/backendApi";
import { HeartSolidIcon, WatchLogoIcon } from "../icons/Icons";
import { removeFromWatchList } from "../helpers/localStorageFunctions";

const WatchList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [watchListDetails, setWatchListDetails] = useState([]);
  useEffect(() => {
    const getWatchListProducts = async () => {
      let res = await fetch(BATCH_WATCHLIST_PRODUCTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          prodIds: JSON.parse(localStorage.getItem("auction-watchlist")),
        }),
      });
      res = await res.json();
      setWatchListDetails(res);
      setIsLoading(false);
    };
    if (localStorage.getItem("auction-watchlist")) {
      getWatchListProducts();
    }
  }, []);

  const handleRemoveFromWatchList = (id) => {
    setWatchListDetails([
      ...watchListDetails.filter((item) => item.product_id !== id),
    ]);
    removeFromWatchList(id);
  };

  return (
    <>
      {localStorage.getItem("auction-watchlist") ? (
        <>
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            <div className="mx-2 w-full px-2 grid grid-cols-4 py-2">
              {watchListDetails.map((item) => (
                <div
                  key={item.product_id}
                  className="w-[350px] h-[420px] rounded-md mx-2 my-1 hover:shadow-2xl transition duration-300 hover:-translate-y-4 hover:shadow-gray-200 border border-gray-300"
                >
                  <div className="relative">
                    <img
                      src={item.product_images[0]}
                      alt="loading..."
                      className="w-full h-[250px] "
                    />
                    <div
                      onClick={() => handleRemoveFromWatchList(item.product_id)}
                      className="absolute top-1
                     right-2 text-red-500 w-fit h-fit py-2 px-2 bg-gray-400/30 rounded-full hover:bg-gray-400/40 cursor-pointer"
                    >
                      <HeartSolidIcon />
                    </div>
                  </div>
                  <div className="flex justify-between px-2 py-1">
                    <div>
                      <div className="font-semibold text-[16px]">
                        {item.product_title.substring(0, 20) + "..."}
                      </div>
                      <div className="text-[13px] text-gray-500">
                        Current Bid:
                      </div>
                      <div className="flex py-1">
                        <div className="text-gray-500 flex justify-center items-center">
                          <WatchLogoIcon />
                        </div>
                        <div className="text-[13px] text-gray-500 flex justify-center items-center">
                          3d 18h
                        </div>
                      </div>
                    </div>
                    <div className="px-2 py-5">
                      <div className="text-[15px] text-blue-600 font-semibold flex justify-end items-center">
                        ₹{item.product_set_price}
                      </div>
                      <div className="text-[15px] text-gray-400 font-medium py-1 flex justify-end items-center">
                        7 bids
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-start">
                    <button className="w-[300px] h-fit py-2 px-8 hover:bg-gray-300 cursor-pointer text-[#313131] rounded-md border border-gray-300 font-medium">
                      View Auction
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div>No Watchlist...</div>
      )}
    </>
  );
};

export default WatchList;
