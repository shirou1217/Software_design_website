// Register.js
import React, { useState } from "react";
import HOME from "../pages/Register.js"; // import the FormComponent
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (a) => {
    setLoading(true);
    const displayName = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // You can continue with your existing logic for handling form submission
  };

  return (
    <div id="content_container">
      <HOME handleSubmit={handleSubmit} loading={loading} err={err} />
    </div>
  );
};

export default Register;
