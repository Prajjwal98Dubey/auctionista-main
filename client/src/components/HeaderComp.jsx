const HeaderComp = () => {
  return (
    <div className="grid grid-rows-2 lg:grid lg:grid-cols-2 w-full h-[500px] py-2 font-kanit">
      <div className="flex lg:hidden w-full h-fit justify-center items-center font-bold text-6xl text-[#313131] mt-2 px-4">
        <img
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1287&auto=format&fit=crop"
          alt="loading!!!"
          className="w-full h-[220px] rounded-[20px] px-2 animate-customBounce"
        />
      </div>
      <div className="w-full font-bold text-4xl lg:text-6xl text-[#313131] mx-2 lg:py-[80px] lg:mt-[35px] px-4 items-center">
        <div className="text-center py-2 ">Tap. Bid. Win.</div>
        <div className="text-center py-2">Bid Bold. Win Big.</div>
        <div className="text-center py-2">Tap. Bid. Win.</div>
        <div className="py-4 flex justify-center">
          <button className="w-[300px] h-[50px] rounded-[30px] text-[18px] bg-purple-800/75 hover:bg-purple-800/95 hover:transition hover:duration-200 text-white font-bold">
            Explore Products
          </button>
        </div>
      </div>
      <div className="hidden w-full h-fit lg:flex justify-center items-center py-10 font-bold text-6xl text-[#313131] m-2 px-4">
        <img
          src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1287&auto=format&fit=crop"
          alt="loading!!!"
          className="w-[640px] h-[400px] rounded-[36px] animate-customBounce"
        />
      </div>
    </div>
  );
};

export default HeaderComp;
