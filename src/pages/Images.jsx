import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import { debounce } from "lodash";

import "./Images.style.scss";
import Header from "../components/Header.component";
import CardList from "../components/CardList.component";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Images = () => {
  const [typed, setTyped] = useState("random");
  const [imageList, setImageList] = useState([]);
  const [info, setInfo] = useState("Random");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const source = axios.CancelToken.source();

  const api = "wuq1Fw10R6HLmkRHRy-aMA1Dqn2iBxRHWOF_RG8X_H8";

  useEffect(() => {
    const authToken = sessionStorage.getItem("Auth Token");

    if (!authToken) {
      navigate("/");
    }

    return;
  }, []);

  useEffect(() => {
    const apiCall = async () => {
      console.log("calling api by " + typed);

      const res = await axios.get(
        `https://api.unsplash.com/search/photos?page=${1}&query=${typed}&client_id=${api}`,
        { cancelToken: source.token }
      );
      if (res.data.results.length === 0) {
        setInfo("No results found");
        setImageList([]);
      } else {
        setImageList((prev) => [...prev, ...res.data.results]);
        setInfo(typed);
      }
    };
    setPage(1);

    setImageList([]);
    apiCall();
    return () => {
      console.log("");
    };
  }, [typed]);

  const loadMore = async () => {
    console.log(
      `https://api.unsplash.com/search/photos?page=${
        page + 1
      }&query=${typed}&client_id=${api}`
    );
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?page=${
        page + 1
      }&query=${typed}&client_id=${api}`
    );
    setPage((prev) => prev + 1);

    setImageList((prev) => [...prev, ...res.data.results]);
  };

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMore();
    }
  }, 100);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((val) => setTyped(val), 1000),
    [typed]
  );

  const handleSearchChange = (event) => {
    const val = event.target.value;
    debouncedSave(val);
  };

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("signing out");
      source.cancel();
      sessionStorage.removeItem("Auth Token");
      navigate("/");
    });
  };

  return (
    <div>
      <Header
        handleSearchChange={handleSearchChange}
        handleLogOut={handleLogOut}
      />
      <h2 className="displaying">Currently Displaying : {info}</h2>
      <CardList key={Math.random()} imageList={imageList} />
    </div>
  );
};

export default Images;
