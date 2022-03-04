import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { app } from "./firebase/firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import "./App.css";
import Home from "./pages/home";
import Images from "./pages/Images";
import { Slide, Snackbar } from "@mui/material";

const App = () => {
  let navigate = useNavigate();

  const [snack, setSnack] = useState({
    open: false,
    snackText: "",
  });

  const handleClose = () => {
    setSnack({
      open: false,
      snackText: "",
    });
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    console.log("u are logged in as ", user);
  });

  const signupUsers = (email, password) => {
    const authentication = getAuth();
    createUserWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
        navigate("/images");
      })
      .catch((err) => {
        console.log(err);
        setSnack({
          open: true,
          snackText: "Signup failed",
        });
      });
  };

  const loginUsers = (email, password) => {
    const authentication = getAuth();
    signInWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
        navigate("/images");
      })
      .catch((err) => {
        console.log(err);
        setSnack({
          open: true,
          snackText: "Incorrect email/password",
        });
      });
  };

  return (
    <div>
      <Routes>
        <Route path="/images" element={<Images />} />
        <Route
          path="/"
          element={<Home signupUsers={signupUsers} loginUsers={loginUsers} />}
        />
      </Routes>
      <Snackbar
        open={snack.open}
        onClose={handleClose}
        TransitionComponent={Slide}
        message={snack.snackText}
      />
    </div>
  );
};

export default App;
