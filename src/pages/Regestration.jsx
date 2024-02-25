import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Audio, Puff, Circles, Rings } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { IoMdEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
// import { getAuth, sendEmailVerification } from "firebase/auth";

const Regestration = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [loader, setLoader] = useState(false);
  let [showPassword, setshowPassword] = useState(false);

  let handel_email = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };

  let handel_name = (e) => {
    setName(e.target.value);
    setNameerr("");
  };
  let handel_password = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };
  let handel_submit = () => {
    if (!email) {
      setEmailerr("Email is required");
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr(" Invalid Email");
    }
    if (!name) {
      setNameerr("Name is required");
    }

    if (!/(?=.*?[A-Z])/.test(password)) {
      setPassworderr(
        "at least one uppercase letter and one lowercase letter and "
      );
    }

    if (!password) {
      setPassworderr("Password is required");
    }

    if (
      name &&
      password &&
      email &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      /(?=.*?[A-Z])/.test(password)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          set(ref(db, "users/" + user.user.uid), {
            name: name,
            email: email,
            profile_picture: "images/profile.png",
          });
          sendEmailVerification(auth.currentUser)
            .then(() => {
              updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: "images/profile.png",
              }).then(() => {
                setTimeout(() => {
                  navigate("/");
                }, 1200);
              });
              setLoader(true);
              toast.success("Regestration Successful 🦄", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((error) => {
              console.log(error.code);
            });
        })
        .catch((error) => {
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr("Email already in use");
          }
          console.log(error.code);
        });
    }
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
      <div className="w-full md:w-2/4 flex justify-center sm:justify-center lg:justify-end">
        <div className="mr-[0px] p-3 sm:p-0  lg:mr-[140px] md:px-[10px]  mt-[45px] lg:mt-[225px]">
          <h1 className="font-nunito text-[32px]  lg:text-[34px] font-bold text-[#11175D]">
            Get started with easily register
          </h1>
          <p className="text-[17px] text-[#9698b7] font-normal">
            Free register and you can enjoy it
          </p>
          <div className="mt-[35px] lg:mt-[40px] relative">
            <p className="font-nunito text-[15px] text-[#11175D] font-semibold absolute top-[-11px] left-[36px] bg-white px-[6px]">
              Email Address
            </p>
            <input
              onChange={handel_email}
              className="w-full md:w-[368px] h-[60px] md:h-[65px] border border-1 border-solid border-[#9698b7] rounded-[6px] outline-none px-[40px]"
              type="email"
              value={email}
            />
            {emailerr && <p className="text-rose-700">{emailerr}</p>}
          </div>
          <div className="mt-[35px] lg:mt-[40px] relative">
            <p className="font-nonito text-[15px] text-[#11175D] font-semibold absolute top-[-11px] left-[36px] bg-white px-[6px]">
              Full name
            </p>
            <input
              onChange={handel_name}
              className="w-full md:w-[368px]  h-[60px] lg:h-[65px] border border-1 border-solid border-[#9698b7]  rounded-[6px] outline-none px-[40px]"
              type="text"
              value={name}
            />
            {nameerr && <p className="text-rose-700">{nameerr}</p>}
          </div>
          <div className="mt-[35px] md:mt-[40px] relative w-full md:w-[368px]">
            <p className="font-nonito text-[15px] text-[#11175D] font-semibold absolute top-[-11px] left-[36px] bg-white px-[6px]">
              Password
            </p>
            <input
              onChange={handel_password}
              className="w-full   h-[60px] lg:h-[65px] border border-1 border-solid border-[#9698b7] rounded-[6px] outline-none px-[40px] "
              type={showPassword ? "text" : "password"}
              value={password}
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

            {passworderr && <p className="text-rose-700">{passworderr}</p>}
          </div>
          {loader ? (
            <div className="w-[368px] flex justify-center">
              <Rings
                height="45"
                width="50"
                radius="9"
                color="#03014C"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            </div>
          ) : (
            <Link
              onClick={handel_submit}
              className="w-full md:w-[368px] inline-block bg-[#5F35F5]  mt-[40px] text-center py-[15px] lg:py-[18px] rounded-[84px] font-nonito text-[#fff] text-[18px]"
              href="#"
            >
              Sign Up
            </Link>
          )}

          <p className="font-nonito w-full md:w-[368px] text-center mt-[28px] lg:mt-[32px] text-[16px] font-normal text-[#03014C]">
            Already have an account ?
            <Link to="/" className="font-bold text-[#EA6C00] " href="#">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:block  w-2/4	">
        <img
          className="w-full h-screen object-cover"
          src="images/regestration.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Regestration;
