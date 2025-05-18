import React from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <>
      <div className="py-4 px-5 font-bold text-[20px]">
        <p className="my-2 mx-3">Related Products</p>
        <div className="flex px-2 mx-1">
          {relatedProducts.map((item, index) => (
            <Link key={index} to={`/product/${item.product_id}`}>
              <div className="w-[300px] h-[250px] rounded-md mx-1 border border-gray-300 transition duration-300 hover:cursor-pointer hover:-translate-y-2 hover:shadow-lg hover:shadow-gray-400">
                <div className="w-full px-2 py-2">
                  <img
                    className="w-full h-[170px]"
                    src={item.product_images[0]}
                    alt="loading"
                    loading="lazy"
                  />
                </div>
                <div className="text-[15px] flex justify-start px-2">
                  {item.product_title.substring(0, 30) + "..."}
                </div>
                <div className="text-[14px] flex py-1 text-gray-600/80 px-2">
                  <div>Current Bid</div>
                  <div className="ml-1">
                    ₹{item.product_set_price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
