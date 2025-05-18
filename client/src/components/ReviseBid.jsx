import { useEffect, useState } from "react";
import {
  GET_MY_PREVIOUS_BID,
  REMOVE_MY_BID,
  REVISE_MY_BID,
} from "../helpers/backendApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBidCollection,
  removeFromBidCollection,
  updateBidOfProduct,
} from "../redux/slices/bidStatusSlice";
import {
  removeProductBidInfo,
  updateProductBidInfo,
} from "../redux/slices/productInfoSlice";

const ReviseBid = ({
  prevBid,
  setPrevBid,
  prodId,
  prodSetPrice,
  prodOriginalPrice,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBidPresent, setIsBidPresent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedBid, setUpdatedBid] = useState(0);
  const bidSelector = useSelector((state) => state.bidStatus.appliedBids);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMyPreviousBid = async () => {
      let res = await fetch(GET_MY_PREVIOUS_BID + `?prodId=${prodId}`, {
        method: "GET",
        credentials: "include",
      });
      res = await res.json();
      if (res.isPrevious) {
        setIsBidPresent(true);
        setPrevBid(res.price);
        dispatch(
          addToBidCollection({ productId: prodId, prevPrice: res.price })
        );
      } else setIsBidPresent(false);
      setIsLoading(false);
    };
    let checkForBidStatus = bidSelector.filter(
      (obj) => obj.productId == prodId
    );
    if (checkForBidStatus.length > 0) {
      setIsBidPresent(true);
      setIsLoading(false);
      setPrevBid(checkForBidStatus[0].prevPrice);
    } else {
      getMyPreviousBid();
    }
  }, [prodId, setPrevBid, dispatch, bidSelector]);
  const handleUpdateBid = async () => {
    if (updatedBid == 0 || updatedBid == null)
      return alert("Enter some price !!!");
    if (
      parseInt(updatedBid) <= parseInt(prodSetPrice) ||
      parseInt(updatedBid) >= parseInt(prodOriginalPrice) ||
      parseInt(updatedBid) < 0
    )
      return alert("Price you want to bid is invalid !!!");
    await fetch(REVISE_MY_BID, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newPrice: parseInt(updatedBid),
        prodId,
      }),
      credentials: "include",
    });
    setIsModalOpen(false);
    dispatch(updateBidOfProduct({ productId: prodId, newPrice: updatedBid }));
    dispatch(
      updateProductBidInfo({
        productId: prodId,
        userBidPrice: parseInt(updatedBid),
        isBidPlaced: false,
      })
    );
    setUpdatedBid(0);
  };
  const handleRemoveMyBid = async () => {
    await fetch(REMOVE_MY_BID + `?prodId=${prodId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setIsModalOpen(false);
    dispatch(removeFromBidCollection({ productId: prodId }));
    dispatch(removeProductBidInfo({ productId: prodId }));
  };
  if (!isBidPresent) return null;
  return (
    <>
      {!isLoading && (
        <div>
          <p
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 hover:text-red-600 font-semibold cursor-pointer"
          >
            revise your bid
          </p>
          {isModalOpen && (
            <div
              onClick={() => setIsModalOpen(false)}
              className="fixed bg-gray-400/25 w-full h-full top-0 left-0"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="z-10 font-kanit fixed transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-[550px] text-white h-[300px] rounded-md bg-[#313131] shadow-sm shadow-gray-500"
              >
                <div className="flex justify-center items-center py-6 text-[18px]">
                  Revise your bid
                </div>
                <div className="flex px-4 justify-center">
                  <div className="text-[14px] text-gray-400 flex items-center px-2">
                    Previous Bid Price
                  </div>
                  <input
                    disabled
                    className="cursor-not-allowed w-[300px] h-[40px] rounded-md bg-gray-600 text-white border border-gray-400 font-semibold px-2"
                    value={`₹${prevBid}`}
                  />
                </div>
                <div className="flex px-4 justify-center py-4">
                  <div className="text-[14px] text-gray-400 flex items-center px-2">
                    Update Bid Price
                  </div>
                  <input
                    autoFocus
                    type="number"
                    className=" w-[300px] h-[40px] rounded-md bg-[#313131] text-white border border-gray-400 font-semibold px-2"
                    value={updatedBid}
                    onChange={(e) => setUpdatedBid(e.target.value)}
                  />
                </div>
                <div className="flex justify-center items-center py-1">
                  <div className="flex justify-center items-center py-2 px-2">
                    <button
                      className="flex justify-center items-center px-2 py-2 bg-purple-600 rounded-md hover:bg-purple-700 cursor-pointer font-semibold"
                      onClick={handleUpdateBid}
                    >
                      Update Bid
                    </button>
                  </div>
                  <div className="flex justify-center items-center py-2 px-2">
                    <button
                      className="flex justify-center items-center px-2 py-2 bg-red-600 rounded-md hover:bg-red-700 cursor-pointer font-semibold"
                      onClick={handleRemoveMyBid}
                    >
                      Remove my bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ReviseBid;
