import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  RELATED_PRODUCTS_API,
  SINGLE_PRODUCTS_API,
} from "../helpers/backendApi";
import {
  HeartOutlineIcon,
  LocationSmallLogoIcon,
  WatchLogoIcon,
} from "../icons/Icons";
import Navbar from "../components/Navbar";
import ProductFeatureTable from "../components/ProductFeatureTable";
import RelatedProducts from "../components/RelatedProducts";
const DEFAULT_USER_IMG =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR1mUIvhtD-xNTuX2-AQczIi6RtMlIDbwUPNOVhmg-ZCZ6y2mwi59Xs4qS_J5JFlrM-J0&usqp=CAU";

const SingleProduct = () => {
  const location = useLocation();
  const [prodDetails, setProdDetails] = useState([]);
  const [currImgIndex, setCurrImgIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const getProductDetails = async () => {
      let res = await fetch(
        SINGLE_PRODUCTS_API + `?prodId=${location.pathname.split("/").at(-1)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      let related = await fetch(
        RELATED_PRODUCTS_API +
          `?category=${res.product_category}&prodId=${res.product_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      related = await related.json();
      setRelatedProducts(related);
      setProdDetails(res);
      setIsLoading(false);
    };
    getProductDetails();
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="hidden lg:grid w-full min-h-screen font-kanit">
        {isLoading ? (
          <div className="flex justify-center items-center py-2 font-bold">
            Loading....
          </div>
        ) : (
          <>
            <div className="flex">
              <div className="w-fit h-full px-8 py-3">
                <div>
                  <img
                    src={prodDetails.product_images[currImgIndex]}
                    alt="loading..."
                    loading="lazy"
                    className="w-[650px] h-[350px] rounded-md"
                  />
                </div>
                <div className="flex w-[650px] py-2">
                  {prodDetails.product_images.map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrImgIndex(index)}
                      className="w-fit h-fit transition duration-300 hover:translate-y-3 cursor-pointer"
                    >
                      <img
                        src={photo}
                        alt="loading"
                        loading="lazy"
                        className={`w-[150px] h-[100px] rounded-md mx-1 ${
                          currImgIndex == index && "border border-purple-300"
                        }`}
                      />
                    </div>
                  ))}
                </div>
                <div className="w-[650px] h-fit border rounded-md my-3 border-gray-400 py-2">
                  <div className="py-2 px-2 font-semibold text-xl">
                    Seller Information
                  </div>
                  <div className="px-3  flex justify-between">
                    <div className="flex">
                      <div className="flex justify-center items-center">
                        <img
                          src={
                            prodDetails.user_photo
                              ? prodDetails.user_photo
                              : DEFAULT_USER_IMG
                          }
                          alt="loading"
                          className="w-[25px] h-[25px] rounded-full"
                        />
                      </div>
                      <div className="flex justify-center ml-2 items-center font-semibold text-[15px] ">
                        {prodDetails.user_name[0].toUpperCase() +
                          prodDetails.user_name.substring(1)}
                      </div>
                    </div>
                    <div className="flex py-1 text-[13px]">
                      <div className="flex justify-center items-center text-gray-700 ">
                        <LocationSmallLogoIcon />
                      </div>
                      {prodDetails.user_city && (
                        <div className="px-1">
                          {prodDetails.user_city[0].toUpperCase() +
                            prodDetails.user_city.substring(1)}
                          ,
                        </div>
                      )}
                      {prodDetails.user_country && (
                        <div className="">
                          {prodDetails.user_country[0].toUpperCase() +
                            prodDetails.user_country.substring(1)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-4 text-[#313131] w-[700px]">
                <div className="flex justify-between">
                  <div className="font-bold text-xl w-[550px] h-fit py-1">
                    {prodDetails.product_title}
                  </div>
                  <div className="w-[40px] h-[40px] rounded-md border border-gray-300 text-gray-800 flex justify-center items-center p-2 hover:bg-gray-200 cursor-pointer">
                    <HeartOutlineIcon />
                  </div>
                </div>
                <div className="flex py-2">
                  <div className="py-1 flex rounded-[36px] bg-gray-300/40 w-fit px-2 font-semibold">
                    <div className="flex justify-center items-center">
                      <WatchLogoIcon />
                    </div>
                    <div className="flex justify-center items-center text-[13px]">
                      <div className="ml-1">3d 2h</div>
                      <div className="ml-1">remaining</div>
                    </div>
                  </div>
                  <div className="flex text-[13px] bg-gray-300/40 px-3 py-1 rounded-[36px] ml-1 font-semibold">
                    <div>23</div>
                    <div className="ml-1">bids</div>
                  </div>
                </div>
                <div className="w-full border border-gray-300 rounded-md py-4">
                  <div className="px-3 py-4">
                    <div className="text-gray-800 text-[17px] flex  items-center">
                      Current Bid
                    </div>
                    <div className=" text-[25px] font-bold">₹23,000</div>
                    <div className="flex text-[14px]">
                      <div className="mr-1">Starting Bid:</div>
                      <div>₹{prodDetails.product_set_price}</div>
                    </div>
                    <div className="py-2">
                      <input
                        type="number"
                        className="w-full h-[40px] rounded-md border border-gray-300"
                      />
                      <div className="w-full py-2">
                        <button className="w-full rounded-md hover:bg-purple-800/75 font-bold text-white bg-purple-800/95 h-[40px]">
                          Place Bid
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  {prodDetails.product_desc && (
                    <div className="w-full h-fit rounded-md px-2 border border-gray-300">
                      <div className="px-2 py-[2px] text-[#313131] font-semibold">
                        Product Description
                      </div>
                      <div className="px-2 py-[2px] text-[15px]">
                        {prodDetails.product_desc}
                      </div>
                    </div>
                  )}
                  {prodDetails.product_appeal && (
                    <div className="w-full mt-2 h-fit rounded-md px-2 border border-gray-300">
                      <div className="px-2 py-[2px] text-[#313131] font-semibold">
                        Product Appeal
                      </div>
                      <div className="px-2 py-[2px] text-[15px] text-purple-600 font-bold">
                        {prodDetails.product_appeal}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="px-4">
              <ProductFeatureTable
                prodId={prodDetails.product_id}
                prodCategory={prodDetails.product_category}
              />
            </div>

            {relatedProducts.length > 0 && (
              <RelatedProducts relatedProducts={relatedProducts} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
