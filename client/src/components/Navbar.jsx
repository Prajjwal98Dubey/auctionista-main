import { useEffect, useState } from "react";
import {
  CloseIcon,
  HamburgerIcon,
  NotificationIcon,
  SearchIcon,
  UserIcon,
} from "../icons/Icons";
import { Link } from "react-router-dom";
import SearchComp from "./SearchComp";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const navBarId = document.getElementById("auction-nav");
      if (window.scrollY > 100) {
        navBarId.style.position = "fixed";
        navBarId.style.width = "80%";
        navBarId.style.top = "0px";
        navBarId.style.left = "140px";
        navBarId.style.zIndex = "50";
        navBarId.style.backgroundColor = "rgb(233,213,255)";
        navBarId.style.borderStyle = "solid";
        navBarId.style.borderWidth = "1px";
        navBarId.style.borderColor = "#540854";

        navBarId.style.borderRadius = "30px";
      } else {
        navBarId.style.position = "relative";
        navBarId.style.width = "";
        navBarId.style.top = "";
        navBarId.style.left = "";
        navBarId.style.zIndex = "";
        navBarId.style.backgroundColor = "";
        navBarId.style.borderRadius = "px";
        navBarId.style.borderStyle = "";
        navBarId.style.borderWidth = "";
        navBarId.style.borderColor = "";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div id="auction-nav" className="flex justify-between mb-2 px-4 py-3">
      {/* Left Component  */}
      <div className="w-fit px-1 lg:w-[500px] lg:h-[45px] lg:flex lg:px-2 lg:py-2 lg:justify-around lg:items-center">
        <Link to="/">
          <div className="lg:flex lg:justify-center items-center font-bold text-2xl lg:text-3xl text-[#313131] h-[45px] px-2 py-2">
            Auctionista
          </div>
        </Link>
        <div className="hidden lg:flex justify-center lg:items-center px-2 text-gray-700 h-[45px] mt-[3px] text-[18px]  cursor-pointer hover:text-purple-500 hover:transition hover:duration-200 font-medium">
          How it works
        </div>
        <div className=" hidden lg:flex justify-center items-center px-2  h-[45px] text-gray-700 mt-[3px] text-[18px] hover:text-purple-500 hover:transition hover:duration-200 font-medium cursor-pointer">
          Sell
        </div>
      </div>

      {/* Mobile Right Component */}
      <div className="flex lg:hidden">
        <div
          className="flex justify-center items-center px-2 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </div>
        {isMenuOpen && (
          <div className="flex z-10 bg-purple-200 lg:hidden fixed h-[300px] shadow-lg shadow-purple-400 rounded-b-[36px] top-[70px] left-0 w-full ">
            <div className="w-full">
              <div className="flex justify-start items-center px-5 py-3 text-[18px] font-medium hover:text-purple-500 hover:cursor-pointer">
                <p className="text-center">How it Works</p>
              </div>
              <div className="flex justify-start items-center px-5 py-3 text-[18px] font-medium hover:text-purple-500 hover:cursor-pointer">
                <p className="text-center">Sell</p>
              </div>
              <div className="w-full flex px-4 py-4 justify-center">
                <div className="flex justify-center items-center px-4 py-4 hover:bg-purple-100 hover:cursor-pointer rounded-full text-gray-700 hover:transition hover:duration-200">
                  <SearchIcon />
                </div>
                <div className="flex justify-center items-center px-4 py-4 hover:bg-purple-100 hover:cursor-pointer rounded-full text-gray-700 hover:transition hover:duration-200">
                  <NotificationIcon />
                </div>
                <Link to="/u">
                  <div className="flex justify-center items-center px-4 py-4 hover:bg-red-500 hover:cursor-pointer rounded-full text-gray-700 hover:transition hover:duration-200">
                    {localStorage.getItem("auction-user-details") &&
                    JSON.parse(localStorage.getItem("auction-user-details"))
                      .userPhoto.length > 0 ? (
                      <img
                        src={
                          JSON.parse(
                            localStorage.getItem("auction-user-details")
                          ).userPhoto
                        }
                        alt="loading"
                        className="w-[32px] h-[32px] rounded-full"
                      />
                    ) : (
                      <UserIcon />
                    )}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Web Right Component */}
      <div className="hidden lg:flex lg:w-[200px] lg:h-[45px] lg:justify-around lg:items-center lg:px-2 lg:py-2 lg:mr-[10px]">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="lg:flex lg:justify-center lg:items-center px-2 py-2 hover:bg-purple-100 hover:cursor-pointer rounded-full text-gray-700 hover:transition hover:duration-200"
        >
          <SearchIcon />
        </div>
        {isSearchOpen && <SearchComp setIsSearchOpen={setIsSearchOpen} />}
        <div className="lg:flex lg:justify-center lg:items-center px-2 py-2 hover:bg-purple-100 hover:cursor-pointer rounded-full text-gray-700 hover:transition hover:duration-200">
          <NotificationIcon />
        </div>
        <div className="lg:flex lg:justify-center lg:items-center rounded-full text-gray-700 ">
          {localStorage.getItem("auction-user-details") ? (
            JSON.parse(localStorage.getItem("auction-user-details")).userPhoto
              .length > 0 ? (
              <Link to="/u">
                <img
                  src={
                    JSON.parse(localStorage.getItem("auction-user-details"))
                      .userPhoto
                  }
                  alt="loading"
                  className="w-[40px] h-[40px] rounded-full object-cover hover:transition hover:duration-200 hover:bg-purple-100 hover:cursor-pointer hover:border hover:border-purple-800"
                />
              </Link>
            ) : (
              <Link to="/u">
                <UserIcon />
              </Link>
            )
          ) : (
            <div className="mx-1">
              <Link to="/auth">
                <button className="py-2 px-5 rounded-md bg-purple-800/75 hover:bg-purple-800/95 text-white font-semibold">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
