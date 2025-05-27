import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import useUserDetails from "../custom-hooks/useUserDetails";
import { SINGLE_PRODUCTS_API } from "../helpers/backendApi";
import BidTimer from "../components/BidTimer";
import BackNavigate from "../components/BackNavigate";
import { auctionDateTag, bidLeftTime } from "../helpers/dateFormatter";
import AuctionTimer from "../components/AuctionTimer";

const DEFAULT_USER_IMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR1mUIvhtD-xNTuX2-AQczIi6RtMlIDbwUPNOVhmg-ZCZ6y2mwi59Xs4qS_J5JFlrM-J0&usqp=CAU";

const Auction = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const userDetails = useUserDetails();
  const [prodDetails, setProdDetails] = useState({});
  const [bidPrice, setBidPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [inpText, setInpText] = useState(0);
  const [count, setCount] = useState(3);
  const [showTimer, setShowTimer] = useState(false);
  const [onlineUser, setOnlineUser] = useState(1);
  const [auctionOver, setAuctionOver] = useState({});
  const [auctionTimeLeft, setAuctionTimeLeft] = useState("");
  useEffect(() => {
    if (
      !socketRef.current &&
      Object.keys(userDetails).length &&
      Object.keys(prodDetails).length &&
      auctionDateTag(prodDetails.bid_start_time).tag.toLowerCase() === "ongoing"
    ) {
      socketRef.current = io("ws://localhost:5002");
      socketRef.current.emit("join-room", {
        roomId: location.pathname.split("/").at(-1),
        user: userDetails.userName,
      });
      socketRef.current.on("prod_ini_price", ({ initialValue }) => {
        setBidPrice(initialValue);
      });
      socketRef.current.on("update_price", ({ newPrice }) => {
        setBidPrice(parseInt(newPrice));
      });
      socketRef.current.on("online_users", ({ userCount }) => {
        setOnlineUser(userCount);
      });
      socketRef.current.on("auction_status", () => {
        setAuctionOver({ tag: "ended", color: "" });
      });
      let time = bidLeftTime(prodDetails.bid_start_time);
      setTimeout(() => {
        socketRef.current.emit("auction_over_update", {
          auctionStatus: "over",
        });
      }, parseInt(time.split("-")[0]) * 60 * 1000 + parseInt(time.split("-").at(-1)) * 1000);
    }
  }, [socketRef, location, userDetails, prodDetails]);
  useEffect(() => {
    const getProductDetails = async () => {
      let res = await fetch(
        SINGLE_PRODUCTS_API + `?prodId=${location.pathname.split("/").at(-1)}`
      );
      res = await res.json();
      setProdDetails({ ...res });
      let time = bidLeftTime(prodDetails.bid_start_time);

      if (auctionDateTag(res.bid_start_time).tag.toLowerCase() === "ongoing") {
        setTimeout(() => {
          setAuctionOver({ tag: "ended", color: "" });
        }, parseInt(time.split("-")[0]) * 60 * 1000 + parseInt(time.split("-").at(-1)) * 1000);
      }

      setAuctionOver({ ...auctionDateTag(res.bid_start_time) });
      setBidPrice(res.product_set_price);
      if (auctionDateTag(res.bid_start_time).tag.toLowerCase() === "ongoing")
        setAuctionTimeLeft(bidLeftTime(res.bid_start_time));
      setIsLoading(false);
    };

    getProductDetails();
  }, [location, prodDetails.bid_start_time]);

  const handleBidPlaced = () => {
    setShowTimer(true);
    setTimeout(() => {
      socketRef.current.emit("new_bid", {
        roomId: location.pathname.split("/").at(-1),
        newPrice: parseInt(inpText),
        originalPrice: parseInt(prodDetails.product_set_price),
      });
      setInpText("");
    }, 3000);
  };

  return (
    <>
      <div className="flex justify-center text-[17px] font-bold">Auction</div>
      {isLoading ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        <>
          <div className="font-kanit">
            <div
              className="fixed top-4 left-4"
              onClick={() => {
                if (socketRef.current) {
                  socketRef.current.emit("socket_disconnect");
                }
              }}
            >
              <BackNavigate />
            </div>
            <div className="flex justify-center items-center py-2">
              <div>
                <div className="text-center font-bold text-3xl">
                  {prodDetails.product_title}
                </div>
                <div className="py-2 flex justify-center">
                  <div className="px-1 text-gray-500">by</div>
                  <div className="px-1">
                    <img
                      src={
                        prodDetails.user_photo
                          ? prodDetails.user_photo
                          : DEFAULT_USER_IMG
                      }
                      alt="user_image"
                      className="w-[20px] h-[20px] rounded-full"
                    />
                  </div>
                  <div className="px-1 font-semibold">
                    {prodDetails.user_name}
                  </div>
                </div>
                <div className="flex justify-center items-center py-2">
                  <div className="text-[12px] text-gray-600 font-medium px-1">
                    Current Price:
                  </div>
                  <div className="flex items-center justify-center text-4xl font-extrabold text-red-600">
                    ₹{bidPrice.toLocaleString()}
                  </div>
                </div>
                <div className="flex justify-center items-center py-2">
                  {auctionOver.tag.toLowerCase() === "ongoing" && (
                    <div className="flex justify-center items-center">
                      <div className="text-[12px] text-gray-600 font-medium px-1">
                        Users Online:
                      </div>
                      <div className="flex items-center justify-center text-4xl font-extrabold text-red-600">
                        {onlineUser}
                      </div>
                    </div>
                  )}
                  {auctionOver.tag.toLowerCase() === "ongoing" && (
                    <div className="flex justify-center items-center">
                      <div className="text-[12px] text-gray-600 font-medium px-1">
                        Time left
                      </div>
                      <AuctionTimer time={auctionTimeLeft} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 flex justify-center">
                <div className="relative">
                  {auctionOver.tag.toLowerCase() === "ended" && (
                    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 text-red-600 font-extrabold text-[74px] w-full flex justify-center items-center rotate-12 border border-red-700">
                      <div className="">Auction Over</div>
                    </div>
                  )}
                  <img
                    src={prodDetails.product_images[0]}
                    alt="product_image"
                    className="w-[550px] h-[450px] rounded-md"
                  />
                </div>
              </div>
              <div className="w-1/2 flex justify-start px-10 items-center">
                <div>
                  <div className="flex h-fit py-2">
                    <div className="text-gray-600 text-[12px] flex justify-center items-center">
                      Starting Price:
                    </div>
                    <div className="font-bold text-3xl flex justify-center items-center px-1">
                      ₹{prodDetails.product_set_price.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <input
                      disabled={
                        auctionOver.tag.toLowerCase() === "ended" ||
                        auctionOver.tag.toLowerCase() === "scheduled"
                          ? true
                          : false
                      }
                      type="number"
                      placeholder="enter price greater than starting price ..."
                      className={`w-[400px] h-[45px] rounded-md px-1 py-1 border border-gray-300 ${
                        (auctionOver.tag.toLowerCase() == "ended" ||
                          auctionOver.tag.toLowerCase() === "scheduled") &&
                        "cursor-not-allowed"
                      }`}
                      value={inpText}
                      onChange={(e) => setInpText(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <button
                      disabled={
                        auctionOver.tag.toLowerCase() === "ended" ||
                        auctionOver.tag.toLowerCase() === "scheduled"
                          ? true
                          : false
                      }
                      onClick={handleBidPlaced}
                      className={`w-[400px] h-[45px] rounded-md px-1 py-1 border border-gray-300 ${
                        auctionOver.tag.toLowerCase() === "ended" ||
                        auctionOver.tag.toLowerCase() === "scheduled"
                          ? "bg-gray-500 cursor-not-allowed  text-white"
                          : "bg-purple-700 cursor-pointer hover:bg-purple-800 text-white"
                      } font-bold `}
                    >
                      {auctionOver.tag.toLowerCase() === "ended"
                        ? "Ended"
                        : auctionOver.tag.toLowerCase() === "scheduled"
                        ? "Scheduled"
                        : "Place Bid"}
                    </button>
                  </div>
                  {showTimer && (
                    <BidTimer
                      count={count}
                      setCount={setCount}
                      showTimer={showTimer}
                      setShowTimer={setShowTimer}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Auction;
