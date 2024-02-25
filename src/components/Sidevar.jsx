import React, { useState, createRef } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuSettings } from "react-icons/lu";
import { GrUploadOption } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLoginInfo } from "../slice/counterSlice";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Sidevar = ({ active }) => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  let name = localStorage.getItem("name");
  const storage = getStorage();
  // const [upload, setupload] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const auth = getAuth();
  const [image, setImage] = useState("");
  const [magic, setMagic] = useState(false);
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const onChangeP = (e) => {
    setMagic(true);
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, "some-child");
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();

      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setImageModal(false);
          });
        });
      });
    }
  };

  let handleImage = () => {
    setImageModal(true);
  };

  let handle_close = () => {
    setImageModal(false);
    setMagic(false);
    setImageModal("");
    setImage("");
  };
  let handleLogOut = () => {
    dispatch(userLoginInfo(null));
    localStorage.setItem("userInfo", "");
    navigate("/");
  };
  return (
    <div className="bg-[#1c9dea] w-full h-screen rounded-[20px] ">
      {/* <ToastContainer
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
      <div className="pt-[25px] ">
        <div className="w-[100px] h-[100px] mx-auto rounded-full relative group">
          <img
            className="w-[100px] h-[100px] mx-auto rounded-full"
            src={data.photoURL}
            alt=""
          />
          <div
            onClick={handleImage}
            className="h-[100px] w-0 absolute top-[0] left-[0] rounded-full bg-[rgba(0,0,0,.6)] group-hover:w-[100px] flex justify-center items-center "
          >
            <GrUploadOption className="text-[40px] text-[#fff]" />
          </div>
        </div>
      </div>
      <h3 className="text-center text-[26px] font-nunito font-semibold text-[#fff] mt-[25px]">
        {data.displayName}
      </h3>
      <div
        className={
          active == "home"
            ? "bg-[#fff] w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[45px] rounded-tl-2xl rounded-bl-2xl relative"
            : " w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[45px] rounded-tl-2xl rounded-bl-2xl relative"
        }
      >
        <Link to={"/Home"}>
          <BiHomeAlt2
            className={
              active == "home"
                ? "text-[#1c9dea] text-[50px] ml-[-30px] "
                : "text-[#BAD1FF] text-[50px] ml-[-30px] "
            }
          />
        </Link>
        <div className="absolute h-[89px] w-2  top-0 right-0 bg-[#1c9dea] shadow-lg rounded-tl-2xl rounded-bl-2xl"></div>
      </div>
      <div
        className={
          active == "message"
            ? "bg-white w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[40px] rounded-tl-2xl rounded-bl-2xl relative"
            : " w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[40px] rounded-tl-2xl rounded-bl-2xl relative"
        }
      >
        <Link to={"/Message"}>
          <TbMessageCircle
            className={
              active == "message"
                ? "text-[#1c9dea] text-[50px] ml-[-30px] "
                : "text-[#BAD1FF] text-[50px] ml-[-30px] "
            }
          />
        </Link>
        <div className=" h-[89px] w-2 absolute top-0 right-0 bg-[#1c9dea] shadow-lg rounded-tl-2xl rounded-bl-2xl"></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[35px] rounded-tl-2xl rounded-bl-2xl relative">
        <IoNotificationsOutline className="text-[#BAD1FF] text-[50px] ml-[-30px] " />
        <div className="absolute h-[89px] w-2  top-0 right-0 bg-[#1c9dea] shadow-lg rounded-tl-2xl rounded-bl-2xl"></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[35px] rounded-tl-2xl rounded-bl-2xl relative">
        <LuSettings className="text-[#BAD1FF] text-[50px] ml-[-30px] " />
        <div className="absolute h-[89px] w-2  top-0 right-0 bg-[#1c9dea] shadow-lg rounded-tl-2xl rounded-bl-2xl"></div>
      </div>
      <div className="bg-transparent w-[161px] h-[89px] ml-auto flex justify-center items-center mt-[35px] rounded-tl-2xl rounded-bl-2xl relative">
        <BiLogOut
          onClick={handleLogOut}
          className="text-[#BAD1FF] text-[50px] ml-[-30px] "
        />
        <div className="absolute h-[89px] w-2  top-0 right-0 bg-[#1c9dea] shadow-lg rounded-tl-2xl rounded-bl-2xl"></div>
      </div>
      {imageModal && (
        <div className="  w-full h-screen bg-[rgba(0,0,0,.5)] absolute top-0 left-0 z-50 flex justify-center items-center">
          <div className=" w-[400px] bg-white shadow-md rounded-[8px] relative py-[30px] px-[28px]">
            <MdClose
              onClick={handle_close}
              className="text-[30px] absolute top-[4px] right-[5px]"
            />
            <input onChange={onChangeP} type="file" />
            {magic && (
              <Cropper
                ref={cropperRef}
                style={{ height: 390, width: "100%" }}
                zoomTo={0.5}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
            )}

            <div className="mt-[18px] pb-1 w-full block">
              <Link
                onClick={getCropData}
                className="w-full block py-3 text-center text-[18px] text-[#fff] font-nunito font-semibold bg-[#5F35F5] mt-[14px] rounded-[8px]"
              >
                Upload
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidevar;
