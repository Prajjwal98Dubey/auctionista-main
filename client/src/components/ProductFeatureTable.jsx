import React, { useEffect, useState } from "react";
import { PRODUCT_FEATURES_LIST_API } from "../helpers/backendApi";
import { mapCategoriesToComponent } from "../helpers/mapCategoryFunc";
import { useDispatch, useSelector } from "react-redux";
import { addProductFeature } from "../redux/slices/productInfoSlice";

const ProductFeatureTable = ({ prodId, prodCategory }) => {
  const [features, setFeatures] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const productInfoSelectore = useSelector(
    (state) => state.productInfo.productFeatureList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const getProductFeaturesList = async () => {
      let res = await fetch(
        PRODUCT_FEATURES_LIST_API + `?prodId=${prodId}&category=${prodCategory}`
      );
      res = await res.json();
      setFeatures(res.details);
      dispatch(addProductFeature({ productId: prodId, features: res.details }));
      setIsLoading(false);
    };
    if (productInfoSelectore[prodId]) {
      setFeatures({ ...productInfoSelectore[prodId] });
      setIsLoading(false);
    } else getProductFeaturesList();
  }, [prodCategory, prodId, dispatch, productInfoSelectore]);
  return (
    <>
      <div className="text-gray-400 text-[20px] font-medium flex justify-center mt-1">
        Feature's List
      </div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className=" font-kanit w-full h-fit px-2 py-1 grid grid-cols-4  rounded-md mb-1 mt-2 border border-gray-300">
          {Object.keys(features).map((feature) => {
            return (
              mapCategoriesToComponent[prodCategory.toLowerCase()][feature] && (
                <div
                  key={feature}
                  className="w-[250px] h-[50px] px-10 py-[2px]"
                >
                  <div className="text-[13px] text-gray-400 font-medium flex justify-center items-center">
                    {
                      mapCategoriesToComponent[prodCategory.toLowerCase()][
                        feature
                      ]
                    }
                  </div>
                  <div
                    className={`text-[15px] font-semibold text-white flex justify-center items-center`}
                  >
                    {features[feature] ? features[feature] : "-"}
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductFeatureTable;
