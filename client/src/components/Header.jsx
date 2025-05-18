import React from "react";
import Navbar from "./Navbar";
import HeaderComp from "./HeaderComp";

const Header = () => {
  return (
    <div className="bg-purple-200 font-kanit w-full rounded-b-[36px] p-2 shadow-md shadow-purple-200">
      <Navbar />
      <HeaderComp />
    </div>
  );
};

export default Header;
