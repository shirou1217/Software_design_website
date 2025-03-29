import React from "react";
import ReactDOM from "react-dom/client";
import Web from "./Web";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
// import {createRoot} from 'react-dom/client';
window.onload=()=>{
 const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <AuthContextProvider>
      <ChatContextProvider>
        <React.StrictMode>
          <Web />
        </React.StrictMode>
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

