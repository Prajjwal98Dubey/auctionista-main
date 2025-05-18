import { useEffect, useState } from "react";
import { GET_MY_DETAILS } from "../helpers/backendApi";
import { useDispatch } from "react-redux";
import { saveUserDetails } from "../redux/slices/userInfoSlice";

export default function useUserDetails() {
  const dispatch = useDispatch();
  const [loggedUserDetails, setLoggedUserDetails] = useState({});
  useEffect(() => {
    const getUserDetails = async () => {
      let res = await fetch(GET_MY_DETAILS, {
        method: "GET",
        credentials: "include",
      });
      res = await res.json();
      setLoggedUserDetails({
        userName: res.user_name,
        userEmail: res.email,
        userPhoto: res.user_photo,
      });
      dispatch(
        saveUserDetails({
          userName: res.user_name,
          userEmail: res.email,
          userPhoto: res.user_photo,
        })
      );
    };
    getUserDetails();
  }, [dispatch]);
  return loggedUserDetails;
}
