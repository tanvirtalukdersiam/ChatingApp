import React from "react";

const input = () => {
  return (
    <div>
      {" "}
      <div className="">
        <input
          className="w-[425px] h-[52px] pl-[55px] rounded-[16px] mt-[10px] relative outline-none border bg-[#fff] shadow-md"
          type="text"
        />
        <HiMiniMagnifyingGlass className="absolute top-[26px] left-[217px] text-[21px]" />
      </div>
    </div>
  );
};

export default input;
