import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./login.styles.scss";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({ error: false, errorText: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    errorText: "",
  });

  const validateEmail = (mail) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (regex.test(mail)) {
      return true;
    }
    setEmailError({
      error: true,
      errorText: "Wrong email format",
    });
    return false;
  };

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      setPasswordError({
        error: true,
        errorText: "Password length is less than 8",
      });
      return false;
    }
    return true;
  };

  const check = () => {
    const validEmail = validateEmail(email);
    const validPass = validatePassword(password);

    if (validEmail && validPass) {
      login(email, password);
      return;
    }

    setPasswordError({ error: true, errorText: "Wrong password" });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <TextField
        style={{ marginTop: "30px" }}
        id="login-email"
        type="email"
        label="Email"
        variant="filled"
        error={emailError.error}
        helperText={emailError.errorText}
        onChange={(e) => {
          setEmailError({ error: false, errorText: "" });
          setEmail(e.target.value);
        }}
      />
      <TextField
        style={{ marginTop: "30px" }}
        id="login-password"
        type="password"
        label="Password"
        variant="filled"
        error={passwordError.error}
        helperText={passwordError.errorText}
        onChange={(e) => {
          setPasswordError({ error: false, errorText: "" });
          setPassword(e.target.value);
        }}
      />
      <Button
        style={{ marginTop: "30px" }}
        variant="outlined"
        onClick={() => check()}
      >
        Login
      </Button>
    </div>
  );
};

export default Login;
