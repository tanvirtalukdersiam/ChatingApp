import React, { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Friendrequest = () => {
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  let [friendRequestList, setFriendRequestList] = useState([]);
  useEffect(() => {
    const FriendRequestRef = ref(db, "FriendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().recevierId) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setFriendRequestList(array);
    });
  }, []);
  let handleFriendAccept = (item) => {
    console.log(item);
    set(push(ref(db, "Friend/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "FriendRequest/" + item.id));
    });
  };
  return (
    <div className="p-[20px] bg-[#fff] shadow-md rounded-[12px] mt-[35px]">
      <div className="flex items-center justify-between  ">
        <h2 className="text-[#000] font-nunito text-[20px] font-bold">
          Friend Request
        </h2>
        <BsThreeDotsVertical className="text-[#5F35F5]" />
      </div>
      <div className="w-full overflow-y-scroll h-[300px] px-3">
        {friendRequestList.map((item) => (
          <div className="flex items-center justify-between mt-[10px] border-b pb-[20px]">
            <img src="images/Ellipse 2.png" alt="" />
            <div>
              <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                {item.senderName}
              </h3>
              <p className="text-[14px] font-nunito text-[#5a5959bf]">
                Hi Guys, Wassup!
              </p>
            </div>
            <Link
              onClick={() => handleFriendAccept(item)}
              className="px-[10px] py-[5px] rounded-[5px] text-[16px] text-[#fff] bg-[#5F35F5] font-semibold"
            >
              Accept
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friendrequest;
