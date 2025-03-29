// FormComponent.js
import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
const Register = ({ handleSubmit, loading, err }) => {
  return (
    <div id="form_container">
      <div id="form_header_container">
        <h2 id="form_header"> Login + Register </h2>
      </div>

      <div id="form_content_container">
        <div id="form_content_inner_container">
          <input type="text" id="full_name" placeholder="Full name" />
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="New Password" />

          <div id="button_container">
            <button onClick={handleSubmit}>Login</button>
            <button onClick={handleSubmit}>Register</button>
          </div>
          {loading && <span>Loading...</span>}
          {err && <span>Something went wrong</span>}
        </div>
      </div>
    </div>
  );
};

export default Register;
