import React, { useEffect, useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link } from "react-router-dom";

const Group = () => {
  let data = useSelector((state) => state.userLoginInfo.userInfo);
  const db = getDatabase();
  const [groupModal, setGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupList, setGroupList] = useState([]);

  let handleGroupRequest = () => {
    setGroupModal(!groupModal);
  };
  let handleInput = (e) => {
    setGroupName(e.target.value);
  };
  let handleGroupName = () => {
    set(push(ref(db, "group/")), {
      groupName: groupName,
      Admin: data.displayName,
      AdminId: data.uid,
    }).then(() => {
      setGroupModal(false);
    });
  };
  useEffect(() => {
    const starCountRef = ref(db, "group/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.val().AdminId) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setGroupList(array);
    });
  }, []);

  let handleGroupJoin = (item) => {
    set(push(ref(db, "groupRequest/")), {
      groupName: item.groupName,
      Admin: item.Admin,
      AdminId: item.AdminId,
      requestName: data.displayName,
      requestId: data.uid,
    }).then(() => {
      alert("done");
    });
  };
  return (
    <div>
      <div>
        <div>
          {" "}
          <div className="mt-[20px] mb-[20px]">
            <input
              className="w-[425px] h-[52px] pl-[65px] rounded-[16px] mt-[10px] relative outline-none border bg-[#fff] shadow-md"
              type="text"
              placeholder="Search"
            />
            <HiMiniMagnifyingGlass className="absolute top-[47px] left-[355px] text-[21px] " />
          </div>
        </div>
      </div>
      <div className="p-[20px] bg-[#fff] shadow-md rounded-[12px]">
        <div className="flex items-center justify-between mb-[15px] ">
          <h2 className="text-[#000] font-nunito text-[22px] font-bold ">
            {groupModal ? "Create a new Group" : "Group List"}
          </h2>
          <AiOutlineUsergroupAdd
            onClick={handleGroupRequest}
            className="text-[#5F35F5] text-[29px]"
          />
        </div>
        {groupModal ? (
          <>
            <input
              onChange={handleInput}
              className=" w-full h-[49px] pl-[15px] rounded-[6px] mt-[10px] relative outline-none border bg-[#fff] "
              type="text"
              placeholder="Enter Your Group Name"
            />
            <div className="mt-[20px]">
              <Link
                onClick={handleGroupName}
                className="px-[164px] py-[10px] rounded-[5px] text-[18px] text-[#fff] bg-[#5F35F5] font-semibold "
              >
                Submit
              </Link>
            </div>
          </>
        ) : (
          <div className="w-full overflow-y-scroll h-[300px] px-3">
            {groupList.map((item) => (
              <div className="flex items-center justify-between mt-[10px] border-b pb-[20px] ">
                <img src="images/g1.png" alt="" />
                <div>
                  <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                    {item.groupName}
                  </h3>
                  <p className="text-[14px] font-nunito text-[#5a5959bf]">
                    Hi Guys, Wassup!
                  </p>
                </div>
                <button
                  onClick={() => handleGroupJoin(item)}
                  className="px-[10px] py-[5px] rounded-[5px] text-[16px] text-[#fff] bg-[#5F35F5] font-semibold"
                >
                  join
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
