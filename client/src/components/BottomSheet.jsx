import { useEffect, useRef, useState } from "react";
import { CrossIcon, HeartOutlineIcon, HeartSolidIcon } from "../icons/Icons";
import {
  ADD_NEW_BID,
  GET_BID_STATUS,
  SINGLE_PRODUCTS_API,
} from "../helpers/backendApi";
import {
  auctionDateTag,
  convertDateToUsageTime,
  isAuctionStart,
} from "../helpers/dateFormatter";
import ProductFeatureTable from "./ProductFeatureTable";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReviseBid from "./ReviseBid";
import { useDispatch, useSelector } from "react-redux";
import { addToBidCollection } from "../redux/slices/bidStatusSlice";
import {
  addProduct,
  addProductsBidInfo,
  updateProductBidInfo,
} from "../redux/slices/productInfoSlice";

const DEFAULT_USER_IMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR1mUIvhtD-xNTuX2-AQczIi6RtMlIDbwUPNOVhmg-ZCZ6y2mwi59Xs4qS_J5JFlrM-J0&usqp=CAU";

const BottomSheet = ({ setShowSingleProduct, prodId }) => {
  const [prodDetails, setProdDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [currIndex, setCurrIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bidStatus, setBidStatus] = useState({});
  const [statusLoading, setStatusLoading] = useState(true);
  const [prevBid, setPrevBid] = useState(0);
  const [showLiveAuctionBtn, setShowLiveAuctionBtn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const bidSelector = useSelector((state) => state.bidStatus.appliedBids);
  const productInfoSelector = useSelector((state) => state.productInfo);
  const timerRef = useRef(null);

  const dispatch = useDispatch();
  const handlePlaceBid = async () => {
    if (currentPrice == 0 || currentPrice == null)
      return alert("Enter some price !!!");
    if (
      parseInt(currentPrice) <= parseInt(prodDetails.product_set_price) ||
      parseInt(currentPrice) >= parseInt(prodDetails.product_original_price) ||
      parseInt(currentPrice) < 0
    )
      return alert("Price you want to bid is invalid !!!");
    await fetch(ADD_NEW_BID, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        prodId: location.pathname.split("/").some((chr) => chr === "product")
          ? location.pathname.split("/").at(-1)
          : prodId,
        bidPrice: parseInt(currentPrice),
      }),
    });
    dispatch(
      addToBidCollection({
        productId: location.pathname.split("/").some((chr) => chr === "product")
          ? location.pathname.split("/").at(-1)
          : prodId,
        prevPrice: parseInt(currentPrice),
      })
    );
    dispatch(
      updateProductBidInfo({
        productId: location.pathname.split("/").some((chr) => chr === "product")
          ? location.pathname.split("/").at(-1)
          : prodId,
        userBidPrice: parseInt(currentPrice),
        isBidPlaced: true,
      })
    );
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    window.onscroll = () => {
      window.scrollTo(0, 0);
    };
    const getProductDetails = async () => {
      let res = await fetch(
        SINGLE_PRODUCTS_API +
          `?prodId=${
            location.pathname.split("/").some((chr) => chr === "product")
              ? location.pathname.split("/").at(-1)
              : prodId
          }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      setProdDetails(res);
      setCurrentPrice(res.product_set_price);
      setIsLoading(false);
      if (auctionDateTag(res.bid_start_time).tag === "Scheduled") {
        let timeDiff = new Date(res.bid_start_time).getTime() - Date.now();
        timerRef.current = setTimeout(() => {
          setShowLiveAuctionBtn(true);
        }, timeDiff);
      }
      dispatch(
        addProduct({ productId: res.product_id, productDetails: { ...res } })
      );
    };
    const getBidStatus = async () => {
      let res = await fetch(
        GET_BID_STATUS +
          `${
            location.pathname.split("/").some((chr) => chr === "product")
              ? location.pathname.split("/").at(-1)
              : prodId
          }`,
        {
          method: "GET",
        }
      );
      res = await res.json();
      setBidStatus({ ...res });
      setStatusLoading(false);
      dispatch(
        addProductsBidInfo({
          productId: location.pathname
            .split("/")
            .some((chr) => chr === "product")
            ? location.pathname.split("/").at(-1)
            : prodId,
          bidInfo: {
            bidCount: parseInt(res.bidCount),
            maxPrice: parseInt(res.maxPrice),
          },
        })
      );
    };
    if (
      productInfoSelector.productInitialDetails[
        location.pathname.split("/").some((chr) => chr === "product")
          ? location.pathname.split("/").at(-1)
          : prodId
      ]
    ) {
      let stateObj =
        productInfoSelector.productInitialDetails[
          location.pathname.split("/").some((chr) => chr === "product")
            ? location.pathname.split("/").at(-1)
            : prodId
        ];
      setProdDetails({ ...stateObj });
      setCurrentPrice(stateObj.product_set_price);
      setIsLoading(false);
    } else {
      getProductDetails();
    }
    if (
      productInfoSelector.productBidInfo[
        location.pathname.split("/").some((chr) => chr === "product")
          ? location.pathname.split("/").at(-1)
          : prodId
      ]
    ) {
      let stateObj =
        productInfoSelector.productBidInfo[
          location.pathname.split("/").some((chr) => chr === "product")
            ? location.pathname.split("/").at(-1)
            : prodId
        ];
      setBidStatus({ ...stateObj });
      setStatusLoading(false);
    } else getBidStatus();
    return () => {
      window.onscroll = null;
      clearTimeout(timerRef.current);
    };
  }, [prodId, location, dispatch, productInfoSelector]);
  return (
    <div className="z-10 fixed top-2 left-0 w-full min-h-screen bg-[#313131] text-white rounded-t-[36px] animate-slideUp font-kanit">
      <div
        className="absolute right-4 top-2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 cursor-pointer transition duration-200"
        onClick={() => {
          if (location.pathname.split("/").some((chr) => chr === "product"))
            navigate(-1);
          else setShowSingleProduct(false);
        }}
      >
        <div className="text-black">
          <CrossIcon />
        </div>
      </div>
      {isLoading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="mt-2 w-full h-full">
          <div className="my-2">
            <div className="flex justify-center items-center py-[3px] text-3xl font-bold">
              {prodDetails.product_title}
            </div>
            <div className="flex justify-center py-1">
              <div className="px-1 text-gray-300">by</div>
              <div className="flex justify-center items-center px-1">
                <img
                  className="w-[30px] h-[30px] rounded-full"
                  src={
                    prodDetails.user_photo
                      ? prodDetails.user_photo
                      : DEFAULT_USER_IMG
                  }
                  alt="user_image"
                />
              </div>
              <div className="text-[17px] font-semibold">
                @{prodDetails.user_name}
              </div>
            </div>
            {!statusLoading && (
              <div className="flex justify-center">
                <div className="flex px-1">
                  <div className="text-[13px] text-gray-400">
                    Number of bids:{" "}
                  </div>
                  <div className="text-[14px] text-white px-1">
                    {productInfoSelector.productBidInfo[
                      location.pathname
                        .split("/")
                        .some((chr) => chr === "product")
                        ? location.pathname.split("/").at(-1)
                        : prodId
                    ]
                      ? productInfoSelector.productBidInfo[
                          location.pathname
                            .split("/")
                            .some((chr) => chr === "product")
                            ? location.pathname.split("/").at(-1)
                            : prodId
                        ].bidCount
                      : 0}
                  </div>
                </div>
                <div className="flex px-1">
                  <div className="text-[13px] text-gray-400">
                    Maximum Bid Price:
                  </div>
                  <div className="text-[14px] text-white px-1 font-extrabold">
                    ₹
                    {productInfoSelector.productBidInfo[
                      location.pathname
                        .split("/")
                        .some((chr) => chr === "product")
                        ? location.pathname.split("/").at(-1)
                        : prodId
                    ]
                      ? productInfoSelector.productBidInfo[
                          location.pathname
                            .split("/")
                            .some((chr) => chr === "product")
                            ? location.pathname.split("/").at(-1)
                            : prodId
                        ].maxPrice
                      : 0}
                  </div>
                </div>
                <div className="flex px-1 text-gray-400 text-[14px]">
                  <ReviseBid
                    prevBid={prevBid}
                    setPrevBid={setPrevBid}
                    prodId={prodDetails.product_id}
                    prodSetPrice={prodDetails.product_set_price}
                    prodOriginalPrice={prodDetails.product_original_price}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            {/* left side */}
            <div className="w-1/2 h-fit px-2 py-1">
              <div className="flex justify-center px-4 py-2">
                <img
                  src={prodDetails.product_images[currIndex]}
                  alt="img"
                  className="w-[550px] h-[370px] rounded-md"
                />
              </div>
              <div className="flex px-5 justify-center ">
                {prodDetails.product_images.map((photo, index) => (
                  <div key={index} className="rounded-md px-1 py-1">
                    <img
                      src={photo}
                      alt="img"
                      className={`w-[120px] h-[80px] rounded-md hover:cursor-pointer ${
                        index === currIndex && "border border-purple-500"
                      }`}
                      onClick={() => setCurrIndex(index)}
                    />
                  </div>
                ))}
              </div>
              {prodDetails.product_appeal && (
                <div className="py-2 px-6">
                  <div className="flex justify-center text-[25px] font-extrabold text-purple-400 font-dancing ">
                    "{prodDetails.product_appeal}"
                  </div>
                  <div className="flex justify-center text-[14px] text-gray-300">
                    Seller's Comment
                  </div>
                </div>
              )}
            </div>
            {/* right side */}
            <div className="w-1/2 px-2 py-1">
              {prodDetails.product_desc && (
                <div className="flex justify-start font-semibold text-[15px]">
                  <div>
                    <div className="text-[13px] text-gray-300 font-semibold">
                      Description
                    </div>
                    <div className="text-[16px]">
                      {prodDetails.product_desc}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex py-2 justify-around">
                <div>
                  <div className="text-gray-300 flex justify-center text-[15px]">
                    Starting Price
                  </div>
                  <div className="flex justify-center font-semibold text-4xl">
                    ₹{prodDetails.product_set_price.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-300 flex justify-center text-[15px]">
                    Original Price
                  </div>
                  <div className="flex justify-center font-semibold text-lg">
                    ₹{prodDetails.product_original_price.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-300 flex justify-center text-[15px]">
                    Usage Time
                  </div>
                  <div className="flex justify-center font-semibold text-lg">
                    {convertDateToUsageTime(prodDetails.product_usage_time)}
                  </div>
                </div>
                <div></div>
              </div>
              <div className="px-4 py-1">
                <div className="py-2">
                  <input
                    type="number"
                    className="w-full h-[45px] font-semibold text-[18px] rounded-md py-1 outline-purple-600 text-black px-2"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                  />
                </div>
                <div className="flex px-2 py-1">
                  <div
                    className="flex justify-center px-3 py-1 items-center bg-purple-400 text-white rounded-md font-medium text-[13px] mx-1 cursor-pointer hover:bg-purple-500"
                    onClick={() =>
                      setCurrentPrice(
                        parseInt(prodDetails.product_set_price) + 500
                      )
                    }
                  >
                    + ₹500
                  </div>
                  <div
                    className="flex justify-center px-3 py-1 items-center bg-purple-400 text-white rounded-md font-medium text-[13px] mx-1 cursor-pointer hover:bg-purple-500"
                    onClick={() =>
                      setCurrentPrice(
                        parseInt(prodDetails.product_set_price) + 1000
                      )
                    }
                  >
                    + ₹1,000
                  </div>
                  <div
                    className="flex justify-center px-3 py-1 items-center bg-purple-400 text-white rounded-md font-medium text-[13px] mx-1 cursor-pointer hover:bg-purple-500"
                    onClick={() =>
                      setCurrentPrice(
                        parseInt(prodDetails.product_set_price) + 2000
                      )
                    }
                  >
                    + ₹2,000
                  </div>
                </div>
                <button
                  disabled={bidSelector.some((obj) => obj.productId == prodId)}
                  className={`w-full h-[45px] bg-purple-700 font-semibold text-[16px] rounded-md ${
                    bidSelector.some((obj) => obj.productId == prodId)
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-700 hover:bg-purple-600  cursor-pointer "
                  }`}
                  onClick={handlePlaceBid}
                >
                  {bidSelector.some((obj) => obj.productId == prodId)
                    ? "Bid Applied"
                    : "Place Bid"}
                </button>
                {(isAuctionStart(prodDetails.bid_start_time) ||
                  showLiveAuctionBtn) && (
                  <Link to={`/auction/${prodDetails.product_id}`}>
                    <button
                      className={`w-full h-[45px] bg-green-700 font-semibold text-[16px] rounded-md cursor-pointer my-1 flex justify-center items-center hover:bg-green-600`}
                    >
                      <div className="flex justify-center items-center font-extrabold h-[45px] px-1 text-green-400 ">
                        <div className="rounded-full w-[10px] h-[10px] bg-red-500 animate-pulse"></div>
                      </div>
                      <div className="flex justify-center items-center h-[45px] text-[15px]">
                        Live Auction
                      </div>
                    </button>
                  </Link>
                )}
              </div>

              <div className="px-3">
                <ProductFeatureTable
                  prodId={
                    location.pathname
                      .split("/")
                      .some((chr) => chr === "product")
                      ? location.pathname.split("/").at(-1)
                      : prodId
                  }
                  prodCategory={prodDetails.product_category}
                />
              </div>
              <div className="px-2 py-1">
                <button className="w-full h-[45px] bg-green-700 font-semibold text-[16px] rounded-md cursor-pointer hover:bg-green-600">
                  Chat with @{prodDetails.user_name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomSheet;
