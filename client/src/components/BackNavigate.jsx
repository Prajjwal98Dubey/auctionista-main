import { useNavigate } from "react-router-dom";
import { LeftArrowIcon } from "../icons/Icons";

const BackNavigate = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex w-fit h-fit px-1 py-2 text-gray-500 hover:text-black cursor-pointer text-[14px] font-semibold font-kanit"
    >
      <div>
        <LeftArrowIcon />
      </div>
      <div className="flex justify-center items-center px-1">back to home</div>
    </div>
  );
};

export default BackNavigate;
