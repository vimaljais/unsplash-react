import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./signup.styles.scss";

const Signup = ({ signupUsers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState({ error: false, errorText: "" });
  const [passwordError, setPasswordError] = useState({
    error: false,
    errorText: "",
  });
  const [confPassError, setConfPassError] = useState({
    error: false,
    errorText: "",
  });

  const validateEmail = (mail) => {
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (regex.test(mail)) {
      return true;
    }
    setEmailError({ error: true, errorText: "Wrong email format" });
    return false;
  };

  const validatePassword = (pass, confPass) => {
    if (pass !== confPass) {
      setConfPassError({ error: true, errorText: "Password not same" });
      return false;
    } else if (pass.length < 8) {
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
    const validPass = validatePassword(password, confirmPassword);

    if (validEmail && validPass) {
      signupUsers(email, password);
    }
  };

  return (
    <div className="sign-up">
      <h1>Signup</h1>
      <TextField
        style={{ marginTop: "30px" }}
        id="signup-email"
        type="email"
        label="Email"
        variant="filled"
        onChange={(e) => {
          setEmailError({ error: false, errorText: "" });
          setEmail(e.target.value);
        }}
        error={emailError.error}
        helperText={emailError.errorText}
      />
      <TextField
        style={{ marginTop: "30px" }}
        id="signup-password"
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
      <TextField
        style={{ marginTop: "30px" }}
        id="signup-confirm-password"
        type="password"
        label="Confirm Password"
        variant="filled"
        error={confPassError.error}
        helperText={confPassError.errorText}
        onChange={(e) => {
          setConfPassError({ error: false, errorText: "" });
          setConfirmPassword(e.target.value);
        }}
      />
      <Button
        style={{ marginTop: "30px" }}
        variant="outlined"
        onClick={() => check()}
      >
        Signup
      </Button>
    </div>
  );
};

export default Signup;
