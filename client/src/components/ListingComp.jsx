import { Link } from "react-router-dom";
import { auctionDateTag } from "../helpers/dateFormatter";
import { useEffect, useState } from "react";
import { MY_LISTING_DETAILS } from "../helpers/backendApi";

export default function ListingComp({ item }) {
  const [listingDetails, setListingDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getListingDetails = async () => {
      let result = await fetch(
        MY_LISTING_DETAILS + `?prodId=${item.product_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      result = await result.json();
      setListingDetails(result);
      setIsLoading(false);
    };
    getListingDetails();
  }, [item.product_id]);
  return (
    <div className="w-[350px] h-[420px] rounded-md mx-2 my-1 hover:shadow-2xl transition duration-300 hover:-translate-y-4 hover:shadow-gray-200 border border-gray-300">
      <div className="relative">
        <img
          src={item.product_images[0]}
          alt="loading..."
          className="w-full h-[250px] "
        />
        <div
          className={` absolute right-1 top-2 w-fit h-fit text-[12px] rounded-md font-semibold bg-gradient-to-r text-white px-1 py-1 ${
            auctionDateTag(item.bid_start_time).color
          }`}
        >
          <div>{auctionDateTag(item.bid_start_time).tag}</div>
        </div>
      </div>
      <div className="flex justify-between px-2 py-1">
        <div>
          <div className="font-semibold text-[16px]">
            {item.product_title.substring(0, 20) + "..."}
          </div>
          <div className="text-[13px] text-gray-500 py-1">Set Price:</div>
          <div className="text-[13px] text-gray-500 py-1">
            People Interested:
          </div>

          {/* <div className="flex py-1">
                    <div className="text-gray-500 flex justify-center items-center">
                      <WatchLogoIcon />
                    </div>
                    <div className="text-[13px] text-gray-500 flex justify-center items-center">
                      3d 18h
                    </div>
                  </div> */}
        </div>
        <div className="px-1 py-5">
          <div className="text-[17px] text-blue-600 font-semibold flex justify-end items-center py-1">
            ₹{item.product_set_price.toLocaleString()}
          </div>
          <div className="text-[17px] text-blue-600 font-semibold flex justify-end items-center">
            {isLoading ? 0 : listingDetails.userInterested}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start">
        <Link to={`/product/${item.product_id}`}>
          <button className="w-[300px] h-fit py-2 px-8 hover:bg-gray-300 cursor-pointer text-[#313131] rounded-md border border-gray-300 font-medium">
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
}
