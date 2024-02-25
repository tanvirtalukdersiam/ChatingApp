import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Blockusers = () => {
  const db = getDatabase();
  let [blockList, setBlockList] = useState([]);
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const friendRef = ref(db, "block/");
    onValue(friendRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().blockById) {
          array.push({
            blockId: item.val().blockId,
            block: item.val().block,
            id: item.key,
          });
        } else if (data.uid == item.val().blockId) {
          array.push({
            blockById: item.val().blockById,
            blockByName: item.val().blockBy,
            id: item.key,
          });
        }
      });
      setBlockList(array);
    });
  }, []);

  let handleUnBlock = (item) => {
    set(push(ref(db, "Friend/")), {
      senderName: data.displayName,
      senderId: data.uid,
      recevierName: item.block,
      recevierId: item.block,
    }).then(() => {
      remove(ref(db, "block/" + item.id));
    });
  };
  return (
    <div>
      <div className="p-[20px] bg-[#fff] shadow-md rounded-[12px] mt-[25px] w-[360px] ">
        <div className="flex items-center justify-between mb-[15px] ">
          <h2 className="text-[#000] font-nunito text-[20px] font-bold">
            BlockList
          </h2>
          <BsThreeDotsVertical className="text-[#5F35F5]" />
        </div>
        <div className="w-full overflow-y-scroll h-[250px] px-3">
          {blockList.map((item) => (
            <div className="flex items-center justify-between mt-[8px] border-b pb-[18px]">
              <img src="images/g1.png" alt="" />
              <div>
                <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                  {item.block}
                </h3>
                <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                  {item.blockByName}
                </h3>
                <p className="text-[14px] font-nunito text-[#5a5959bf]">
                  Dinner?
                </p>
              </div>
              {item.blockId ? (
                <button
                  onClick={() => handleUnBlock(item)}
                  className="px-[10px] py-[5px] rounded-[5px] text-[16px] text-[#fff] bg-[#5F35F5] font-semibold"
                >
                  Unblock
                </button>
              ) : (
                <button className="px-[10px] py-[5px] rounded-[5px] text-[16px] text-[#fff] bg-gray-400 font-semibold">
                  Unavaliable
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blockusers;
