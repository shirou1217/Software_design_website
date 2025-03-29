import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { loginUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log(message.sender)
  console.log(loginUser.uid)
  console.log(message.senderId === loginUser.uid )
  return (
    <div
      ref={ref}
      className={`message ${message.senderId  === loginUser.uid && "owner"}`}
     
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === loginUser.uid
              ? loginUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* <span>just now</span> */}
      </div>
      <div className="msgcontent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
