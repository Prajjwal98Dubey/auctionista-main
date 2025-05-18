import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  ActiveTagLogoIcon,
  CalendarLogoIcon,
  CubeLogoIcon,
  EditLogoIcon,
  ItemSaleLogoIcon,
  LocationLogoIcon,
  WalletLogoIcon,
} from "../icons/Icons";
import ActiveAuction from "../components/ActiveAuction";
import WonAuction from "../components/WonAuction";
import WatchList from "../components/WatchList";
import Reviews from "../components/Reviews";
import { LOGOUT_USER_API } from "../helpers/backendApi";
import { allLocalStorageKeys } from "../helpers/localStorageFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DEFAULT_USER_IMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR1mUIvhtD-xNTuX2-AQczIi6RtMlIDbwUPNOVhmg-ZCZ6y2mwi59Xs4qS_J5JFlrM-J0&usqp=CAU";

const tags = [
  {
    id: 0,
    name: "Active Auctions",
    comp: <ActiveAuction />,
  },
  {
    id: 1,
    name: "Won Auctions",
    comp: <WonAuction />,
  },
  {
    id: 2,
    name: "Watchlist",
    comp: <WatchList />,
  },
  {
    id: 3,
    name: "Reviews",
    comp: <Reviews />,
  },
];
const Profile = () => {
  const [selectedType, setSelectedType] = useState(0);
  const navigate = useNavigate();
  const userInfo = useSelector((store) => store.userInfo);

  const handleUserLogOut = async () => {
    await fetch(LOGOUT_USER_API, {
      method: "DELETE",
      credentials: "include",
    });
    let allKeys = allLocalStorageKeys();
    for (let key of allKeys) {
      localStorage.removeItem(key);
    }
    navigate("/");
  };

  return (
    <>
      <Navbar />
      {console.log("user details", userInfo.userDetails)}
      <div className="hidden lg:flex font-kanit ">
        <div className="w-full min-h-screen px-3 py-2">
          <div className="w-full h-fit border border-gray-300 rounded-md flex justify-between">
            <div className="flex px-4">
              <div className="p-[4px] w-fit h-fit border border-gray-400 rounded-full m-2">
                <img
                  src={
                    localStorage.getItem("auction-user-details") &&
                    JSON.parse(localStorage.getItem("auction-user-details"))
                      .userPhoto.length > 0
                      ? JSON.parse(localStorage.getItem("auction-user-details"))
                          .userPhoto
                      : DEFAULT_USER_IMG
                  }
                  className="w-[90px] h-[90px] rounded-full object-cover"
                />
              </div>
              <div className="px-2 m-2">
                <div className="font-bold text-[25px] flex justify-start px-2">
                  @
                  {
                    JSON.parse(localStorage.getItem("auction-user-details"))
                      .userName
                  }
                  <div className="flex justify-center px-2 text-[12px] text-white">
                    <button
                      onClick={handleUserLogOut}
                      className="px-3 py-1 bg-red-500 rounded-[22px] hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="flex justify-start py-1 px-2 items-center">
                  <div>
                    <LocationLogoIcon />
                  </div>
                  <div className="text-[12px] text-gray-600 px-1">BLR,IN</div>
                </div>
                <div className="flex justify-start py-1 px-2 items-center">
                  <div>
                    <CalendarLogoIcon />
                  </div>
                  <div className="text-[12px] text-gray-600 px-1">
                    Member since 2022
                  </div>
                </div>
              </div>
            </div>
            <div className="px-5 py-5">
              <div className="flex w-fit h-fit py-2 px-3 hover:bg-gray-200/90 cursor-pointer border border-[#313131] items-center rounded-md">
                <div className="px-2">
                  <EditLogoIcon />
                </div>
                <p className="text-center text-[14px] text-[#313131] font-semibold">
                  Edit Profile
                </p>
              </div>
            </div>
          </div>
          <div className="my-4 px-5 w-full h-[200px] border border-gray-300 rounded-md py-5 flex">
            <div className="w-1/4 h-full px-2  bg-gray-200/30  flex justify-center items-center rounded-md mx-1">
              <div>
                <div className="py-[2px] flex justify-center text-yellow-500">
                  <ItemSaleLogoIcon />
                </div>
                <div className="py-[2px] flex justify-center font-bold  text-[20px]">
                  23
                </div>
                <div className="py-[2px] flex justify-center text-[15px] text-gray-600">
                  Bids Won
                </div>
              </div>
            </div>
            <div className="w-1/4 h-full px-2  bg-gray-200/30  flex justify-center items-center rounded-md mx-1">
              <div>
                <div className="py-[2px] flex justify-center text-blue-500">
                  <ActiveTagLogoIcon />
                </div>
                <div className="py-[2px] flex justify-center font-bold  text-[20px]">
                  7
                </div>
                <div className="py-[2px] flex justify-center text-[15px] text-gray-600">
                  Active Bids
                </div>
              </div>
            </div>
            <div className="w-1/4 h-full px-2  bg-gray-200/30  flex justify-center items-center rounded-md mx-1">
              <div>
                <div className="py-[2px] flex justify-center text-amber-600">
                  <CubeLogoIcon />
                </div>
                <div className="py-[2px] flex justify-center font-bold  text-[20px]">
                  4
                </div>
                <div className="py-[2px] flex justify-center text-[15px] text-gray-600">
                  Items For Sale
                </div>
              </div>
            </div>
            <div className="w-1/4 h-full px-2  bg-gray-200/30  flex justify-center items-center rounded-md mx-1">
              <div>
                <div className="py-[2px] flex justify-center text-green-500">
                  <WalletLogoIcon />
                </div>
                <div className="py-[2px] flex justify-center font-bold  text-[20px]">
                  ₹23000
                </div>
                <div className="py-[2px] flex justify-center text-[15px] text-gray-600">
                  Total Spent
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[50px] bg-gray-200/20 rounded-md px-3 py-1 flex">
            {tags.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`text-[16px] font-semibold hover:text-gray-500 cursor-pointer  ${
                  selectedType === t.id
                    ? "text-[#313131] bg-white shadow-sm shadow-gray-300"
                    : "text-gray-400"
                } flex justify-center items-center w-1/4  rounded-md py-3  px-2 mx-1`}
              >
                {t.name}
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center py-2 items-center">
            {tags[selectedType].comp}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
