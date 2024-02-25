import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUserInfo } from "../slice/chatSlice";

const Friend = () => {
  let dispatch = useDispatch();
  const db = getDatabase();
  let [friendList, setFriendList] = useState([]);
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  useEffect(() => {
    const friendRef = ref(db, "Friend/");
    onValue(friendRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().senderId ||
          data.uid == item.val().recevierId
        ) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendList(array);
    });
  }, []);

  let handleBlock = (item) => {
    if (data.uid == item.senderId) {
      set(push(ref(db, "block/")), {
        block: item.recevierName,
        blockId: item.recevierId,
        blockBy: data.displayName,
        blockById: data.uid,
      }).then(() => {
        remove(ref(db, "Friend/" + item.id));
      });
    } else {
      set(push(ref(db, "block/")), {
        block: item.senderName,
        blockId: item.senderId,
        blockBy: item.recevierName,
        blockById: item.recevierId,
      }).then(() => {
        remove(ref(db, "Friend/" + item.id));
      });
    }
  };

  let handleMsgF = (item) => {
    console.log(item);
    if (data.uid == item.senderId) {
      dispatch(
        activeUserInfo({ name: item.recevierName, id: item.recevierId })
      );
    } else {
      dispatch(activeUserInfo({ name: item.senderName, id: item.senderId }));
    }
  };
  return (
    <div>
      <div>
        <div className="p-[20px] bg-[#fff] shadow-md rounded-[12px] mt-[25px] w-[360px] ">
          <div className="flex items-center justify-between mb-[15px] ">
            <h2 className="text-[#000] font-nunito text-[20px] font-bold">
              Friends
            </h2>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
          <div className="w-full overflow-y-scroll h-[380px] px-3">
            {friendList.map((item) => (
              <div
                onClick={() => handleMsgF(item)}
                className="flex items-center justify-between mt-[10px] border-b pb-[20px]"
              >
                <img src="images/Ellipse 2.png" alt="" />
                <div>
                  {data.uid == item.senderId ? (
                    <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                      {item.recevierName}
                    </h3>
                  ) : (
                    <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                      {item.senderName}
                    </h3>
                  )}
                  <p className="text-[14px] font-nunito text-[#5a5959bf]">
                    Hi Guys, Wassup!
                  </p>
                </div>
                <Link
                  onClick={() => handleBlock(item)}
                  className="px-[10px] py-[5px] rounded-[5px] text-[16px] text-[#fff] bg-[#5F35F5] font-semibold"
                >
                  Block
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
