import React from "react";
import Sidevar from "../components/Sidevar";
import Group from "../components/Group";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import Friend from "../components/Friend";
import Messagebox from "../components/Messagebox";
const Message = () => {
  let handleScarch = (e) => {
    let data = users.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsersSearchList(data);
  };
  return (
    <div className="flex">
      <div className="w-[193px] h-screen ">
        <Sidevar active="message" />
      </div>
      <div className="w-[423px] h-screen ml-[33px] ">
        <div>
          {" "}
          <div className="mt-[8px] mb-[8px] relative">
            <input
              onChange={handleScarch}
              className="w-[360px] h-[52px] pl-[78px] rounded-[16px] mt-[10px] relative outline-none border bg-[#fff] shadow-md"
              type="text"
              placeholder="Search Userlist"
            />
            <HiMiniMagnifyingGlass className="absolute top-[26px] left-[35px] text-[21px] " />
          </div>
        </div>
        <div>
          <Friend />
        </div>
      </div>
      <div className="w-[70%] h-screen">
        <Messagebox />
      </div>
    </div>
  );
};

export default Message;
