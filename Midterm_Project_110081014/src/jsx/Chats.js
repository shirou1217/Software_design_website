import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
// import { getUserCounts } from './Room.js';
// const userCounts = getUserCounts();
// console.log(userCounts);
const Chats = () => {
  const [chats, setChats] = useState([]);
  const [chatroom, setChatroom] = useState({});
  const { loginUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", loginUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };

    };
    // const getroom=()=>{
    //   const unsub = onSnapshot(doc(db, "chatroom", loginUser.uid), (doc) => {
    //     setChatroom(doc.data());
    // });

    //   return () => {
    //     unsub();
    //   };
    // };
    loginUser.uid && getChats();
  }, [loginUser.uid]);
   
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  const Selectroom =(room)=>{
    dispatch({ type: "CHANGE_ROOM", payload: room });
  }
  // console.log(Object.entries(chats));
  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((content) => (
        <div
          className="SiderUser"
          key={content[0]}
          onClick={() => handleSelect(content[1].userInfo)}
        > 
          <img src={content[1].userInfo.photoURL} alt="" />
          <div className="SiderUserInfo">
            <span>{content[1].userInfo.displayName}</span>
            <p>{content[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
      {/* {Object.entries(chatroom)?.sort((a, b) => b[1].date - a[1].date).map((chatroomEntry) => (
        <div className="chtroom" key={chatroomEntry[0]} onClick={() => Selectroom(chatroomEntry[1][0].roomid)}>
          <div className="ctroominfo">
              <span>{"chatroom " + chatroomEntry[1][0].roomid}</span>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Chats;
