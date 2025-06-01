import { useState } from "react";
import { CameraIcon, CloseIcon, DEFAULT_USER_IMG } from "../icons/Icons";
import { addUserImage } from "../firebase/firebase.storage";
import { EDIT_USER } from "../helpers/backendApi";

const USER_FIELDS = {
  Username: "user_name",
  Email: "user_email",
  "First Name": "user_first_name",
  "Last Name": "user_last_name",
  City: "user_city",
  Country: "user_country",
};
const EditProfile = ({
  details,
  setDetails,
  setIsEditModalOpen,
  editDetails,
  setEditDetails,
}) => {
  const [userImage, setUserImage] = useState({
    preview: details.user_photo ? details.user_photo : DEFAULT_USER_IMG,
    file: "",
    isUpdated: false,
  });
  const handleEditUser = async () => {
    // upload image to firebase storage
    let url = "";
    if (userImage.isUpdated) {
      url = await addUserImage(userImage.file);
      alert("User Image Updated !!!");
    }
    // check for changes
    let editObj = {};
    if (userImage.isUpdated) editObj["user_photo"] = url;
    for (let key of Object.keys(USER_FIELDS)) {
      if (editDetails[USER_FIELDS[key]].trim() != details[USER_FIELDS[key]]) {
        editObj[USER_FIELDS[key]] = editDetails[USER_FIELDS[key]].trim();
      }
    }
    await fetch(EDIT_USER, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(editObj),
    });
    setDetails({ ...editDetails });
    localStorage.removeItem("auction-user-details");
    localStorage.setItem(
      "auction-user-details",
      JSON.stringify({
        userName: editDetails.user_name,
        userEmail: editDetails.user_email,
        userPhoto: url ? url : details.user_photo,
      })
    );
    setIsEditModalOpen(false);
  };
  const handleUserImage = (e) => {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setUserImage({ preview: url, file, isUpdated: true });
  };
  return (
    <div className="z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 font-kanit text-white">
      <div className="w-[600px] min-h-[600px] py-1 bg-[#313131] rounded-md">
        <div className="flex justify-center items-center py-1 font-bold text-3xl relative">
          <div
            onClick={() => setIsEditModalOpen(false)}
            className="w-fit h-fit p-2 rounded-full bg-gray-500 hover:bg-gray-400 cursor-pointer absolute right-4 top-1 text-white font-extrabold"
          >
            <CloseIcon />
          </div>
          Edit Profile
        </div>
        <div className="w-full h-fit px-1 py-1 flex justify-center ">
          <div className="w-fit h-fit relative">
            <label>
              <div className="absolute top-1 right-0 p-2 w-fit h-fit bg-gray-500 rounded-full hover:bg-gray-400 cursor-pointer">
                <CameraIcon />
              </div>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleUserImage}
              />
            </label>
            <img
              src={userImage.preview}
              alt="user_img"
              className="w-[130px] h-[120px] rounded-full px-1 py-1"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            {Object.keys(USER_FIELDS).map((field, index) => (
              <div className="flex mt-2 mb-2" key={index}>
                <div className="w-[120px] text-[16px] flex justify-center text-gray-300 items-center">
                  {field.toLowerCase()}
                </div>
                <div>
                  <input
                    className="w-[400px] h-[45px] rounded-md border bg-[#313131] border-gray-400 px-2 py-2"
                    value={editDetails[USER_FIELDS[field]]}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        [USER_FIELDS[field]]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center py-2">
          <button
            onClick={handleEditUser}
            className="flex justify-center items-center hover:border hover:border-gray-300 transition duration-200 w-[90px] h-[35px] rounded-md bg-gradient-to-r from-blue-400 to-blue-600 font-bold text-white"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
