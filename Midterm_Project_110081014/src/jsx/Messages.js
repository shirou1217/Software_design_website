import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";
import { AuthContext } from "../context/AuthContext";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { loginUser } = useContext(AuthContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);
  // console.log(data.chatId)
  // useEffect(() => {
  //   const unSub = onSnapshot(doc(db, "chatroom", data.chatId), (doc) => {
  //     if (doc.exists()) {
  //       // Accessing the room array from the Firestore document
  //       const roomData = doc.data().room;
  
  //       // Extracting messages from the first element of the room array
  //       const messages = roomData.length > 0 ? roomData[0].message : [];
  
  //       setMessages(messages);
  //       console.log(messages);
  //     }
  //   });
  //   return () => {
  //     unSub();
  //   };
  // }, [data.chatId]);
  // console.log(messages)

  return (
    <div className="msgbgr">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
