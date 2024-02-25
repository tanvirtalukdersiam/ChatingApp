import React, { useEffect, useState } from "react";

import Sidevar from "../components/Sidevar";
import Group from "../components/Group";
import Friendrequest from "../components/Friendrequest";
import Friend from "../components/Friend";
import Mygroup from "../components/Mygroup";
import Userlist from "../components/Userlist";
import Blockusers from "../components/Blockusers";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "../slice/counterSlice";
const Home = () => {
  const auth = getAuth();

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    if (data == "NULL") {
      navigate("/");
    }
  }, []);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(userLoginInfo(user));
      localStorage.setItem("userInfo", JSON.stringify(user));
    }
  });
  return (
    <div>
      {data.emailVerified ? (
        <div className="flex justify-between">
          <div className="w-[186px] h-screen ">
            <Sidevar active="home" />
          </div>
          <div className="w-[427px] h-[347px] ml-[25px]">
            <Group />
            <Friendrequest />
          </div>
          <div className="w-[427px] h-[347px] ml-[25px]">
            <Friend />
            <Mygroup />
          </div>
          <div className="w-[427px] h-[347px] ml-[25px]">
            <Userlist />
            <Blockusers />
          </div>
        </div>
      ) : (
        <div class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
          <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
            <div class="relative">
              <div class="absolute">
                <div class="">
                  <h1 class="my-2 text-gray-800 font-bold text-2xl">
                    Your email is not verify
                  </h1>
                  <p class=" mb-8 my-2 text-gray-800">
                    Please verify your email
                  </p>
                  <Link
                    to={"/"}
                    class=" mt-[20px] sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
                  >
                    Login
                  </Link>
                </div>
              </div>
              <div>
                <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
              </div>
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
