import { useState } from "react";
import {
  CloseEyeIcon,
  EmailIcon,
  InputUserIcon,
  LockIcon,
  OpenEyeIcon,
  RightArrowAuthLogin,
  SmallUserIcon,
} from "../icons/Icons";
import AuthFooter from "./AuthFooter";
import { REGISTER_USER_API } from "../helpers/backendApi";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../redux/slices/userInfoSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    let res = await fetch(REGISTER_USER_API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        user_name: user,
        user_email: email,
        user_password: password,
      }),
    });
    res = await res.json();
    if (res["message"] !== undefined) {
      toast.error(res["message"], {
        position: "top-center",
        duration: 1500,
      });
      return;
    } else {
      dispatch(
        saveUserDetails({
          userName: res.user_name,
          userEmail: res.user_email,
          userPhoto: res.user_photo ? res.user_photo : "",
        })
      );
      localStorage.setItem(
        "auction-user-details",
        JSON.stringify({
          userName: res.user_name,
          userEmail: res.user_email,
          userPhoto: res.user_photo ? res.user_photo : "",
        })
      );
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center py-2">
      <form>
        <div className="mt-1 mb-1 py-1">
          <label className="text-[14px] text-purple-600 font-semibold py-2">
            User
          </label>
          <br />
          <div className="relative">
            <input
              type="text"
              name="userEmail"
              className="w-[380px] h-[40px] border border-gray-200 rounded-md px-[40px]"
              placeholder="John Doe"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <div className="text-purple-600 font-semibold absolute top-[9px] left-2">
              <InputUserIcon />
            </div>
          </div>
        </div>
        <div className="mt-1 mb-1 py-1">
          <label className="text-[14px] text-purple-600 font-semibold py-2">
            Email
          </label>
          <br />
          <div className="relative">
            <input
              type="text"
              name="userEmail"
              className="w-[380px] h-[40px] border border-gray-200 rounded-md px-[40px]"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="text-purple-600 font-semibold absolute top-[9px] left-2">
              <EmailIcon />
            </div>
          </div>
        </div>
        <div className="mt-2 mb-2">
          <div className="flex justify-between px-1">
            <div>
              <label className="text-[14px] text-purple-600 font-semibold py-2">
                Password
              </label>
            </div>
            <div className="text-[12px] text-purple-600 font-semibold py-[5px] hover:underline cursor-pointer">
              Forget Password
            </div>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-[380px] h-[40px] border border-gray-200 rounded-md px-[40px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-purple-600 font-semibold absolute top-[9px] left-2">
              <LockIcon />
            </div>
            <div
              className="text-purple-600 font-semibold absolute top-[9px] right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-1">
          <div onClick={handleRegisterUser} className="relative">
            <button className="hover:bg-purple-700 w-[380px] flex justify-center items-center h-[45px] rounded-md bg-purple-600 font-semibold text-white cursor-pointer">
              Create Account
            </button>
            <div className="absolute top-3 left-[100px] font-bold text-white">
              <InputUserIcon />
            </div>
          </div>
        </div>
        <AuthFooter compText="Sign up with google" />
      </form>
    </div>
  );
};

export default SignUp;
