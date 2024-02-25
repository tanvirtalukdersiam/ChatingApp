import React, { useState } from "react";
import { Audio, Puff, Circles, Rings } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { IoMdEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { userLoginInfo } from "../slice/counterSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate("");
  const auth = getAuth();

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [showPassword, setshowPassword] = useState(false);

  let handel_email = (e) => {
    setEmail(e.target.value);
  };

  let handel_password = (e) => {
    setPassword(e.target.value);
  };

  let handle_submit = () => {
    if (!email) {
      setEmailerr("Email is required");
    }
    if (!password) {
      setPassworderr("Password is required");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          localStorage.setItem("name", "SiAM");
          dispatch(userLoginInfo(user.user));
          localStorage.setItem("userInfo", JSON.stringify(user.user));
          setError("");
          toast.success("Login Successful ", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/Home");
          }, 2500);
        })
        .catch((error) => {
          if (error.code.includes("auth/invalid-credential")) {
            setError("Please check all");
          }
          console.log(error.code);
        });
    }
  };
  let handle_google = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        set(ref(db, "users/" + user.user.uid), {
          name: result.user.displayName,
          email: result.user.email,
          profile_picture: result.user.photoURL,
        });
        navigate("/home");
      })
      .catch((error) => {
        console.log(error.code);
      });
  };
  return (
    <div className="flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />

      {/* TROSTIFY CODE */}
      <div className="w-full md:w-2/4 lg:flex justify-center  ">
        <div className=" mr-[0]  mt-[50px]  lg:mt-[230px] px-[10px] lg:px-[0px] ">
          <h1 className="font-nunito text-[34px] font-bold text-[#11175D]">
            Login to your account!
          </h1>
          <button
            onClick={handle_google}
            className="flex gap-3 font-semibold text-sm rounded-[6px] border border-1-solid p-[20px] mt-[18px]"
          >
            <img src="images/googole.png" alt="" />
            <span>Login with Google</span>
          </button>
          <div className="mt-[40px] relative">
            <p className="font-nonito text-[15px] text-[#11175D] font-semibold absolute top-[-11px] left-[36px] bg-white px-[6px]">
              Email Address
            </p>
            <input
              onChange={handel_email}
              className=" w-full sm:w-[355px] h-[60px] border-b border-1 border-solid border-[#9698b7]  outline-none px-[40px]"
              type="email"
            />
            {emailerr && <p className="text-rose-700">{emailerr}</p>}
          </div>

          <div className="mt-[38px] relative w-[355px]">
            <p className="font-nunito text-[15px] text-[#11175D] font-semibold absolute top-[-11px] left-[36px] bg-white px-[6px]">
              Password
            </p>
            <input
              onChange={handel_password}
              className="w-full md:w-[355px]  h-[60px] border-b border-1 border-solid border-[#9698b7]  outline-none px-[40px] "
              type={showPassword ? "text" : "password"}
            />

            {showPassword ? (
              <IoIosEye
                onClick={() => setshowPassword(false)}
                className=" absolute top-[22px] right-[8px] text-[25px]"
              />
            ) : (
              <IoMdEyeOff
                onClick={() => setshowPassword(true)}
                className=" absolute top-[22px] right-[8px] text-[25px]"
              />
            )}

            {error && <p className="text-rose-700">{error}</p>}
          </div>

          <Link
            onClick={handle_submit}
            className="w-[368px] inline-block bg-[#5F35F5] mt-[40px] text-center py-[18px] rounded-[84px] font-nonito text-[#fff] text-[18px]"
            href="#"
          >
            Login to Continue
          </Link>

          <p className="font-nonito w-[368px] text-center mt-[32px] text-[17px] font-normal text-[#03014C]">
            Don’t have an account ?
            <Link
              to="/Regestration"
              className="font-bold text-[#EA6C00] "
              href="#"
            >
              Sign In
            </Link>
            <div>
              <Link to="/Forget" className="mt-[18px] text-[16px] text-[#000]">
                Forget Password
              </Link>
            </div>
          </p>
        </div>
      </div>
      <div className=" hidden md:block w-2/4	">
        <img
          className="w-full h-screen object-cover"
          src="images/login.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
