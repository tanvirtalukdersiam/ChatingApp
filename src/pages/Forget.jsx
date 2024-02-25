import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Forget = () => {
  const auth = getAuth();
  let [forgetEmail, setForgetMail] = useState("");
  let [error, setError] = useState("");
  let handle_email = (e) => {
    setForgetMail(e.target.value);
  };
  let handle_submit = () => {
    sendPasswordResetEmail(auth, forgetEmail)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        if (error.code.includes("auth/missing-email")) {
          setError("please email");
        }
      });
  };
  return (
    <div className=" flex justify-center sm:justify-between h-screen  ">
      <div className="  px-[10px] md:px-[25px] lg:px-0 mt-[30px] md:mt-[70px] lg:mt-[200px] ml-0 lg:ml-[280px] w-[390px]">
        <h1 className=" text-center md:text-left text-[33px] font-nunito text-[#03014C]">
          Forget Password
        </h1>
        <h5 className=" text-center md:text-left mt-[10px] text-[20px] font-nunito text-[#03014C]">
          Enter the email address associated with your account
        </h5>
        <p className=" text-center md:text-left mt-[12px] text-[18px] text-[#a3a5c3] font-normal">
          We will email you a link to reset your password
        </p>
        <div className="mt-[45px] relative">
          <p className="font-nonito text-[15px] text-[#11175D] font-semibold absolute top-[-11px] left-[36px] bg-white px-[6px]">
            Email Address
          </p>
          <input
            onChange={handle_email}
            className=" w-full md:w-[370px] h-[60px] lg:h-[70px] border border-1.5 border-solid border-[#9698b7]  outline-none px-[40px] rounded-[5px]"
            type="email"
          />
          {error && <p className="text-rose-700">{error}</p>}
          <div className="mt-[35px] md:mt-[40px] mr-[15px] ">
            <Link
              onClick={handle_submit}
              className="bg-[#5F35F5] text-[18px] font-nunito text-[#fff] px-[50px] py-[14px] rounded-[8px] mr-[78px] md:mr-[30px]"
            >
              Send
            </Link>
            <Link
              to="/"
              className="bg-red-600 text-[16px] font-nunito text-[#fff] px-[50px] py-[14px] rounded-[8px] mr-[30px]"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
      <div>
        <img
          className=" hidden md:block mt-[10px] lg:mt-[110px] mr:[10px] lg:mr-[150px] w-[600px] h-[450px] lg:h-[600px]"
          src="images/forget.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Forget;
