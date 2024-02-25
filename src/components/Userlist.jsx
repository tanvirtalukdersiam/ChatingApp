import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineMinus } from "react-icons/ai";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
const Userlist = () => {
  const db = getDatabase();
  const [users, setUsers] = useState([]);
  const [usersSearchList, setUsersSearchList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [friendList, setFriendList] = useState([]);
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUsers(array);
    });
  }, []);

  let handleFriendRequest = (item) => {
    console.log(item);
    set(push(ref(db, "FriendRequest/")), {
      senderName: data.displayName,
      senderEmail: data.email,
      senderId: data.uid,
      recevierName: item.name,
      recevierEmail: item.email,
      recevierId: item.id,
    }).then(() => {
      // toast.success("Request Send Successful ", {
      //   position: "top-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    });
  };

  useEffect(() => {
    const friendRequestRef = ref(db, "FriendRequest/");
    onValue(friendRequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().recevierId + item.val().senderId);
      });
      setFriendRequestList(array);
    });
  }, []);
  useEffect(() => {
    const friendRequestRef = ref(db, "Friend/");
    onValue(friendRequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().recevierId + item.val().senderId);
      });
      setFriendList(array);
    });
  }, []);

  let handleScarch = (e) => {
    let data = users.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsersSearchList(data);
  };

  return (
    <div>
      <div>
        {" "}
        <div className="mt-[8px] mb-[8px] relative">
          <input
            onChange={handleScarch}
            className="w-[357px] h-[52px] pl-[70px] rounded-[16px] mt-[10px] relative outline-none border bg-[#fff] shadow-md"
            type="text"
            placeholder="Search Userlist"
          />
          <HiMiniMagnifyingGlass className="absolute top-[26px] left-[35px] text-[21px] " />
        </div>
      </div>
      <div>
        <div className="p-[20px] bg-[#fff] shadow-md rounded-[12px] mt-[25px] w-[360px] ">
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
          <div className="flex items-center justify-between mb-[15px] ">
            <h2 className="text-[#000] font-nunito text-[20px] font-bold">
              Userlist
            </h2>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
          <div className="w-full overflow-y-scroll h-[380px] px-3">
            {usersSearchList.length > 0
              ? usersSearchList.map((item) => (
                  <div className="flex items-center justify-between mt-[8px] border-b pb-[18px]">
                    <img src="images/g1.png" alt="" />
                    <div>
                      <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                        {item.name}
                      </h3>
                      <p className="text-[14px] font-nunito text-[#5a5959bf]">
                        Dinner?
                      </p>
                    </div>

                    {friendList.includes(data.uid + item.id) ||
                    friendList.includes(item.id + data.uid) ? (
                      <Link>
                        <h2 className="text-[#fff] bg-[#5F35F5] text-[18px] px-[9px] font-semibold">
                          F
                        </h2>
                      </Link>
                    ) : friendRequestList.includes(data.uid + item.id) ||
                      friendRequestList.includes(item.id + data.uid) ? (
                      <Link>
                        <AiOutlineMinus className="text-[#fff] bg-[#5F35F5] text-[18px] h-[20px] w-[20px] " />
                      </Link>
                    ) : (
                      <Link onClick={() => handleFriendRequest(item)}>
                        <FaPlus className="text-[#fff] bg-[#5F35F5] text-[18px] h-[20px] w-[20px] " />
                      </Link>
                    )}
                  </div>
                ))
              : users.map((item) => (
                  <div className="flex items-center justify-between mt-[8px] border-b pb-[18px]">
                    <img src="images/g1.png" alt="" />
                    <div>
                      <h3 className="text-[#000] font-nunito text-[18px] font-bold">
                        {item.name}
                      </h3>
                      <p className="text-[14px] font-nunito text-[#5a5959bf]">
                        Dinner?
                      </p>
                    </div>

                    {friendList.includes(data.uid + item.id) ||
                    friendList.includes(item.id + data.uid) ? (
                      <Link>
                        <h2 className="text-[#fff] bg-[#5F35F5] text-[18px] px-[9px] font-semibold">
                          F
                        </h2>
                      </Link>
                    ) : friendRequestList.includes(data.uid + item.id) ||
                      friendRequestList.includes(item.id + data.uid) ? (
                      <Link>
                        <AiOutlineMinus className="text-[#fff] bg-[#5F35F5] text-[18px] h-[20px] w-[20px] " />
                      </Link>
                    ) : (
                      <Link onClick={() => handleFriendRequest(item)}>
                        <FaPlus className="text-[#fff] bg-[#5F35F5] text-[18px] h-[20px] w-[20px] " />
                      </Link>
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
