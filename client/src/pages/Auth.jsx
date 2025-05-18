import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      className="hidden lg:flex lg:w-full font-kanit lg:min-h-screen bg-gradient-to-br from-purple-50 to-white
"
    >
      <div className="flex justify-center w-full py-16">
        <div className="border border-white shadow-sm shadow-gray-400 rounded-[16px] w-[500px] h-fit     py-10 bg-white">
          <div className="flex justify-center mb-2 text-[23px] text-purple-700 font-bold ">
            <div>
              <p className="text-center">Welcome</p>
              <div className="flex justify-center text-[17px] text-purple-500 font-light">
                {isLogin ? (
                  <div>Sign in to your account</div>
                ) : (
                  <div>Create a new account</div>
                )}
              </div>
            </div>
          </div>
          <div className=" flex justify-center">
            <div className=" w-[380px] rounded-md h-[40px] border border-gray-300 flex py-[3px] bg-slate-300">
              <div
                onClick={() => setIsLogin(true)}
                className={`cursor-pointer w-1/2 h-full rounded-md text-gray-600 font-semibold text-[16px] flex justify-center items-center mx-[3px] ${
                  isLogin && "bg-purple-300 text-purple-800 font-medium"
                }`}
              >
                Login
              </div>
              <div
                onClick={() => setIsLogin(false)}
                className={` cursor-pointer w-1/2 h-full rounded-md text-gray-600 font-semibold text-[16px] flex justify-center items-center mx-[3px] ${
                  !isLogin && "bg-purple-300 text-purple-800 font-medium"
                }`}
              >
                Sign Up
              </div>
            </div>
          </div>
          {isLogin ? <Login /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
