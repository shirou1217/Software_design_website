import React from "react";
import Upperbar from "./Upperbar"
import Search from "./Search"
import Chats from "./Chats"
import Rooms from "./Room"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Upperbar />
      <Search/>
      <Chats/>
      <Rooms/>
    </div>
  );
};

export default Sidebar;
