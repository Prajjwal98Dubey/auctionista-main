import {
  filterByLowToHighPrice,
  filterByRecentlyAdded,
  filterByTag,
} from "../helpers/filterFunc";
import { FilterIcon } from "../icons/Icons";

const FILTER_OPTIONS = {
  scheduled: {
    mappedFunction: filterByTag,
    isParameters: true,
    para: { tag: "scheduled" },
  },
  ended: {
    mappedFunction: filterByTag,
    isParameters: true,
    para: { tag: "ended" },
  },
  ongoing: {
    mappedFunction: filterByTag,
    isParameters: true,
    para: { tag: "ongoing" },
  },
  recently: {
    mappedFunction: filterByRecentlyAdded,
    isParameters: false,
  },
  lowToHighPrice: {
    mappedFunction: filterByLowToHighPrice,
    isParameters: false,
  },
  removeFilter: {
    mappedFunction: () => {},
    isParameters: false,
  },
};

const FILTERS = {
  "Recently Added": "recently",
  Scheduled: "scheduled",
  Ended: "ended",
  Ongoing: "ongoing",
  "Low to High Price": "lowToHighPrice",
};

const ProductFilter = ({ setFilterOption }) => {
  const handleFilterSelect = (e) => {
    setFilterOption({ ...FILTER_OPTIONS[e.target.value] });
  };
  return (
    <div className="flex px-2">
      <div className=" px-2">
        <FilterIcon />
      </div>
      <select
        defaultValue="no"
        className="border border-purple-800 shadow-md shadow-purple-400 rounded-md px-2 text-[15px] font-medium"
        onChange={handleFilterSelect}
      >
        <option disabled value="no">
          select a option
        </option>
        {Object.keys(FILTERS).map((filterName, index) => (
          <option key={index} value={FILTERS[filterName]}>
            {filterName}
          </option>
        ))}
      </select>
      <div className="flex justify-center items-center bg-red-500 hover:bg-red-600 cursor-pointer w-[90px] px-1 py-1 h-[30px] rounded-md mx-1">
        <p className="text-white font-bold text-[13px]">remove filter</p>
      </div>
    </div>
  );
};

export default ProductFilter;
