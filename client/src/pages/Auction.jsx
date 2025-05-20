import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import useUserDetails from "../custom-hooks/useUserDetails";
import { SINGLE_PRODUCTS_API } from "../helpers/backendApi";
import BidTimer from "../components/BidTimer";

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
  const intervalRef = useRef(null);
  useEffect(() => {
    if (
      !socketRef.current &&
      Object.keys(userDetails).length &&
      Object.keys(prodDetails).length
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
    }
  }, [socketRef, location, userDetails, prodDetails]);
  useEffect(() => {
    const getProductDetails = async () => {
      let res = await fetch(
        SINGLE_PRODUCTS_API + `?prodId=${location.pathname.split("/").at(-1)}`
      );
      res = await res.json();
      setProdDetails({ ...res });
      setBidPrice(res.product_set_price);
      setIsLoading(false);
    };

    getProductDetails();
  }, [location]);

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
                  <div className="text-[12px] text-gray-600 font-medium px-1">
                    Users Online:
                  </div>
                  <div className="flex items-center justify-center text-4xl font-extrabold text-red-600">
                    {onlineUser}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="w-1/2 flex justify-center">
                <img
                  src={prodDetails.product_images[0]}
                  alt="product_image"
                  className="w-[550px] h-[450px] rounded-md"
                />
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
                      type="number"
                      placeholder="enter price greater than starting price ..."
                      className="w-[400px] h-[45px] rounded-md px-1 py-1 border border-gray-300"
                      value={inpText}
                      onChange={(e) => setInpText(e.target.value)}
                    />
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleBidPlaced}
                      className="w-[400px]  h-[45px] rounded-md px-1 py-1 border border-gray-300 bg-purple-700 hover:bg-purple-800 text-white font-bold cursor-pointer"
                    >
                      Place Bid
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
