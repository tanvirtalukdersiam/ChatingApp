import React, { useEffect, useState } from "react";
import { TbTriangleFilled } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { LuSmilePlus } from "react-icons/lu";
import { IoMdCamera } from "react-icons/io";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineSettingsVoice } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { AudioRecorder } from "react-audio-voice-recorder";
import ScrollToBottom from "react-scroll-to-bottom";
import {
  getDownloadURL,
  getStorage,
  ref as sraf,
  uploadBytes,
} from "firebase/storage";

const Messagebox = () => {
  let uuid = uuidv4();
  const storage = getStorage();
  const db = getDatabase();
  let [msg, setMsg] = useState("");
  let [msgList, setMsgList] = useState([]);
  let [emojiModal, setEmojiModal] = useState("");
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  let chatData = useSelector((state) => state.activeUserMsg.chatData);
  console.log(chatData);
  let handleMsg = (e) => {
    setMsg(e.target.value);
  };

  let handleMsgSend = () => {
    set(push(ref(db, "Msg/")), {
      senderName: data.displayName,
      senderId: data.uid,
      recevierName: chatData.name,
      recevierId: chatData.id,
      Msg: msg,
      date: `${new Date().getFullYear()} -${
        new Date().getMonth() + 1
      } -${new Date().getDate()} -${new Date().getHours()} -${new Date().getMinutes()}`,
    }).then(() => {
      setMsg("");
    });
  };

  useEffect(() => {
    const messageRef = ref(db, "Msg/");
    onValue(messageRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          (data.uid == item.val().senderId &&
            chatData.id == item.val().recevierId) ||
          (data.uid == item.val().recevierId &&
            chatData.id == item.val().senderId)
        ) {
          array.push(item.val());
        }
      });
      setMsgList(array);
    });
  }, [chatData.id]);

  let handleEmoji = () => {
    setEmojiModal(!emojiModal);
  };

  let handleEmojiClick = (e) => {
    setMsg(e.emoji + msg);
  };

  let handleImageFile = (e) => {
    const storageRef = sraf(storage, uuid);

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "Msg/")), {
          senderName: data.displayName,
          senderId: data.uid,
          recevierName: chatData.name,
          recevierId: chatData.id,
          img: downloadURL,
          date: `${new Date().getFullYear()} -${
            new Date().getMonth() + 1
          } -${new Date().getDate()} -${new Date().getHours()} -${new Date().getMinutes()}`,
        });
      });
    });
  };

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const storageRef = sraf(storage, uuid);

    console.log(blob);
    uploadBytes(storageRef, blob).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "Msg/")), {
          senderName: data.displayName,
          senderId: data.uid,
          recevierName: chatData.name,
          recevierId: chatData.id,
          audio: downloadURL,
          date: `${new Date().getFullYear()} -${
            new Date().getMonth() + 1
          } -${new Date().getDate()} -${new Date().getHours()} -${new Date().getMinutes()}`,
        });
      });
    });
  };

  let handlePress = (e) => {
    if (e.key == "Enter") {
      set(push(ref(db, "Msg/")), {
        senderName: data.displayName,
        senderId: data.uid,
        recevierName: chatData.name,
        recevierId: chatData.id,
        Msg: msg,
        date: `${new Date().getFullYear()} -${
          new Date().getMonth() + 1
        } -${new Date().getDate()} -${new Date().getHours()} -${new Date().getMinutes()}`,
      }).then(() => {
        setMsg("");
      });
    }
  };
  return (
    <>
      <div className="bg-[#eff7fe] h-[908px] shadow-md rounded-[22px] p-6 mt-[2px]">
        {/* name starts */}
        <div className="flex items-center gap-4 pb-3 border-b border-solid mb-8">
          <img src="images/g1.png" alt="" />
          <div>
            <h1 className="text-[20px] font-nunito font-semibold">
              {chatData.name}
            </h1>
            <h2 className="bg-[#3fcc35] text-[15px] font-nunito font-medium inline px-[6px] py-[2px] text-white rounded-[5px]">
              Online
            </h2>
          </div>
        </div>
        {/* name ends */}
        {/* recive message starts */}

        <div className="h-[81%] overflow-y-scroll px-2">
          {msgList.map((item) =>
            data.uid == item.senderId ? (
              item.Msg ? (
                <div className="px-[15px] mt-4 flex justify-end">
                  <div>
                    <div className="bg-[#1c9dea] inline-block px-5 py-2 rounded-[5px]  relative ">
                      <TbTriangleFilled className="absolute bottom-[-2px] right-[-9px] text-[20px] text-[#1c9dea]" />
                      <h3 className="text-[20px] text-[#fff] font-nunito font-medium">
                        {item.Msg}
                      </h3>
                    </div>
                    <h3 className="font-nunito text-[14px] text-[#647589] mt-[4px]">
                      {moment(item.date, "YYYYMMDDh:mm:ss a").fromNow()}
                    </h3>
                  </div>
                </div>
              ) : item.img ? (
                <div className="px-[15px] mt-4 flex justify-end">
                  <div>
                    <div className="bg-[#1c9dea] inline-block px-[10px] py-2 rounded-[5px]  relative ">
                      <TbTriangleFilled className="absolute bottom-[-2px] right-[-9px] text-[20px] text-[#1c9dea]" />

                      <ModalImage
                        small={item.img}
                        large={item.img}
                        alt=""
                        className="w-[250px] h-[300px] object-cover"
                      />
                    </div>
                    <h3 className="font-nunito text-[14px] text-[#647589] mt-[4px]">
                      {moment(item.date, "YYYYMMDDh:mm:ss a").fromNow()}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="px-[15px] mt-4 flex justify-end">
                  <div>
                    <div className=" inline-block px-5 py-2 rounded-[5px]  relative ">
                      <audio className=" " src={item.audio} controls></audio>
                    </div>
                    <h3 className="font-nunito text-[14px] text-[#647589] mt-[4px]">
                      {moment(item.date, "YYYYMMDDh:mm:ss a").fromNow()}
                    </h3>
                  </div>
                </div>
              )
            ) : item.Msg ? (
              <div className="px-[15px]">
                <div>
                  <div className="bg-[#e5edf5] inline-block px-5 py-2 rounded-[5px]  relative ">
                    <TbTriangleFilled className="absolute bottom-[-2px] left-[-9px] text-[20px] text-[#e5edf5]" />
                    <h3 className="text-[20px] font-nunito font-medium">
                      {item.Msg}
                    </h3>
                  </div>
                  <h3 className="font-nunito text-[14px] text-[#647589] mt-[4px]">
                    {moment(item.date, "YYYYMMDDh:mm:ss a").fromNow()}
                  </h3>
                </div>
              </div>
            ) : item.img ? (
              <div className="px-[15px] mt-4">
                <div>
                  <div className="bg-[#e5edf5] inline-block px-[10px] py-2 rounded-[5px]  relative ">
                    <TbTriangleFilled className="absolute bottom-[-2px] left-[-9px] text-[20px] text-[#e5edf5]" />
                    <ModalImage
                      small={item.img}
                      large={item.img}
                      alt=""
                      className="w-[250px] h-[300px] object-cover"
                    />
                  </div>
                  <h3 className="font-nunito text-[14px] text-[#647589] mt-[4px]">
                    {moment(item.date, "YYYYMMDDh:mm:ss a").fromNow()}
                  </h3>
                </div>
              </div>
            ) : (
              <div className="px-[15px]">
                <div>
                  <div className="bg-[#e5edf5] inline-block px-5 py-2 rounded-[5px]  relative ">
                    <audio
                      className=" rounded-sm"
                      src={item.audio}
                      controls
                    ></audio>
                  </div>
                  <h3 className="font-nunito text-[14px] text-[#647589] mt-[4px]">
                    {moment(item.date, "YYYYMMDDh:mm:ss a").fromNow()}
                  </h3>
                </div>
              </div>
            )
          )}
        </div>
        <div className="mt-[12px] mr-[50px] relative ">
          <input
            onKeyUp={handlePress}
            onChange={handleMsg}
            className=" w-full border-b border-2 border-[#eff7fe] shadow-md py-[16px]  border-solid  outline-none rounded-b-[16px] pl-4"
            type="text "
            value={msg}
          />
          <label>
            <input onChange={handleImageFile} className="hidden" type="file" />
            <IoMdCamera className="text-[26px] absolute right-[16px] text-[#1c9dea] bottom-[14px]" />
          </label>
          <LuSmilePlus
            onClick={handleEmoji}
            className="text-[26px] absolute right-[57px] text-[#1c9dea] bottom-[15px]
            "
          />
          <MdOutlineSettingsVoice
            className="text-[25px] absolute right-[94px] text-[#1c9dea] bottom-[15px]
            "
          />
          {msg ? (
            <div className="absolute right-[-52px] bottom-[12px]">
              <IoSend
                onClick={handleMsgSend}
                className="text-[32px] text-[#fff] bg-[#1c9dea]
           px-[6px] py-[2px] rounded-[5px]"
              />
            </div>
          ) : (
            <div className="absolute right-[-52px] bottom-[12px]">
              <IoSend
                className="text-[32px] text-[#fff] bg-[#71717a]
         px-[6px] py-[2px] rounded-[5px]"
              />
            </div>
          )}
        </div>
        <AudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={true}
          downloadFileExtension="webm"
        />

        {emojiModal && (
          <div className="absolute bottom-[61px] right-[130px]">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </>
  );
};

export default Messagebox;
