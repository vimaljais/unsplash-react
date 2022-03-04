import React, { useEffect } from "react";
import "./home.style.scss";
import Login from "../components/Login.component";
import Signup from "../components/Signup.component";
import { createTheme, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = ({ signupUsers, loginUsers }) => {
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");

    if (authToken) {
      navigate("/images");
    }
    return;
  }, []);

  return (
    <div className="homepage">
      <ThemeProvider theme={darkTheme}>
        <Signup signupUsers={signupUsers} />
        <Login login={loginUsers} />
      </ThemeProvider>
    </div>
  );
};

export default Home;
