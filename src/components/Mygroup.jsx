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
import { useSelector } from "react-redux";

const Mygroup = () => {
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [myGroupList, setMyGroupList] = useState([]);
  const [groupModal, setGroupModal] = useState(false);

  useEffect(() => {
    const starCountRef = ref(db, "group/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().AdminId) {
          array.push(item.val());
        }
      });
      setMyGroupList(array);
    });
  }, []);
  let handleGroupSettings = () => {
    setGroupModal(!groupModal);
  };
  return (
    <div>
      <div>
        <div className="p-[20px] bg-[#fff] shadow-md rounded-[12px] mt-[25px] w-[360px] ">
          <div className="flex items-center justify-between mb-[15px] ">
            <h2 className="text-[#000] font-nunito text-[20px] font-bold">
              My Group
            </h2>
            <BsThreeDotsVertical
              onClick={handleGroupSettings}
              className="text-[#5F35F5]"
            />
          </div>
          {groupModal ? (
            <h1>hi</h1>
          ) : (
            <div className="w-full overflow-y-scroll h-[290px] px-3">
              {myGroupList.map((item) => (
                <div className="flex items-center justify-between mt-[8px] border-b pb-[18px]">
                  <img src="images/Ellipse 2.png" alt="" />
                  <div>
                    <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                      {item.groupName}
                    </h3>
                    <p className="text-[14px] font-nunito text-[#5a5959bf]">
                      Dinner?
                    </p>
                  </div>
                  <p className="text-[12px] font-nunito text-[#5a5959bf]">
                    Today, 8:56pm
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mygroup;
