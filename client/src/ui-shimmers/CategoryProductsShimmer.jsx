const CategoryProductsShimmer = () => {
  return (
    <div className="hidden lg:grid lg:grid-cols-4">
      {new Array(10).fill("").map((_, index) => (
        <div
          key={index}
          className="w-[300px] h-[250px] rounded-[25px] px-2 mx-2 my-2 py-2 bg-gray-200 animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default CategoryProductsShimmer;
