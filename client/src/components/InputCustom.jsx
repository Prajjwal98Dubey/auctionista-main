import { useContext } from "react";
import { mapCategoriesToInput } from "../helpers/mapCategoryToOptions";
import ProductContext from "../context/ProductContext";

const InputCustom = ({ feature }) => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  if (mapCategoriesToInput[feature] === "text") {
    return (
      <>
        <input
          type="text"
          onChange={(e) => {
            setProductDetails({ ...productDetails, [feature]: e.target.value });
          }}
          className="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent transition-all duration-200"
        />
        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600">
          {feature.charAt(0).toUpperCase() + feature.slice(1)}
        </label>
      </>
    );
  } else if (mapCategoriesToInput[feature] === "number") {
    return (
      <>
        <input
          type="number"
          onChange={(e) => {
            setProductDetails({ ...productDetails, [feature]: e.target.value });
          }}
          className="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent transition-all duration-200"
        />
        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600">
          {feature.charAt(0).toUpperCase() + feature.slice(1)}
        </label>
      </>
    );
  } else if (mapCategoriesToInput[feature] === "date") {
    return (
      <>
        <input
          type="date"
          onChange={(e) => {
            setProductDetails({ ...productDetails, [feature]: e.target.value });
          }}
          className="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent transition-all duration-200"
        />
        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600">
          {feature.charAt(0).toUpperCase() + feature.slice(1)}
        </label>
      </>
    );
  } else if (mapCategoriesToInput[feature] === "time") {
    return (
      <>
        <input
          type="datetime-local"
          onChange={(e) => {
            setProductDetails({ ...productDetails, [feature]: e.target.value });
          }}
          className="peer w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-transparent transition-all duration-200"
        />
        <label className="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600">
          {feature.charAt(0).toUpperCase() + feature.slice(1)}
        </label>
      </>
    );
  }
};

export default InputCustom;
