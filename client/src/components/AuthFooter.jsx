import React from "react";
import { GoogleLogoIcon } from "../icons/Icons";
import { googleSignIn } from "../helpers/firebaseFunctions";
import { THIRD_PARTY_AUTH_API } from "../helpers/backendApi";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../redux/slices/userInfoSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthFooter = ({ compText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const handleGoogleSignIn = async () => {
    try {
      const { userName, userEmail, userPhoto } = await googleSignIn();
      await fetch(THIRD_PARTY_AUTH_API, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName,
          user_email: userEmail,
          user_photo: userPhoto,
        }),
      });
      localStorage.setItem(
        "auction-user-details",
        JSON.stringify({ userEmail, userName, userPhoto })
      );
      dispatch(saveUserDetails({ userName, userEmail, userPhoto }));
      navigate("/");
    } catch (err) {
      toast.error("Google Sign in failed ", {
        position: "top-center",
        duration: 1500,
      });
      console.log(err);
    }
  };

  return (
    <div className="mt-3 mb-2 flex justify-center items-center font-kanit">
      <div className="w-[380px] h-[45px] flex justify-center items-center border border-gray-300 rounded-md hover:bg-purple-100 cursor-pointer">
        <div onClick={() => handleGoogleSignIn()} className="w-[280px]  h-full">
          <div className="flex justify-center items-center py-3">
            <GoogleLogoIcon />
            <p className="text-center text-[14px] text-purple-500 font-semibold">
              {compText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthFooter;
