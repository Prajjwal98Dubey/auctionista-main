import { useEffect, useState } from "react";
import { MY_PRODUCTS } from "../helpers/backendApi";
import ListingComp from "./ListingComp";

const MyListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getMyProducts = async () => {
      let result = await fetch(MY_PRODUCTS, {
        method: "GET",
        credentials: "include",
      });
      result = await result.json();
      setListings([...result.products]);
      setIsLoading(false);
    };
    getMyProducts();
    // getMyListingDetails();
  }, []);

  return (
    <div className="w-full h-full font-kanit">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="mx-2 w-full px-2 grid grid-cols-4 py-2">
          {listings.map((item) => (
            <div key={item.product_id} className="w-full h-full">
              <ListingComp item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
