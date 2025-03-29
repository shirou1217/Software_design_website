import React, { useContext } from "react";
import Messages from "./Messages";
import Type from "./Type";
import { ChatContext } from "../context/ChatContext";
// import add from '../img/add.png'
const SidebarUsers = () => {
  const { data } = useContext(ChatContext);
    
  return (
    <div className="sidebaruser">
      <div className="sidebaruserInfo">
        <span>{data.user?.displayUser}</span>
        {/* <span>{data.user?.roomid}</span> */}
        <div className="sidebarchatIcons">
          {/* <img src={add} alt="" /> */}
        </div>
      </div>
      <Messages />
      <Type/>
    </div>
  );
};

export default SidebarUsers;
