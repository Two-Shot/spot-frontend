import React from "react";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";
import Login from "./components/Login";
import SearchOptions from "./components/SearchOptions";
import CardContainer from "./components/CardContainer";
import ArrowBack from "./components/ArrowBack";
import ArrowNext from "./components/ArrowNext";
import Footer from "./components/Footer";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = (props) => {
  const [searchOps, setSearchOps] = useState({
    q: "album",
    t: "week",
    sort: "top",
  });
  const [musicItems, setMusicItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [shareInfo, setShareInfo] = useState({});
  const [page, setPage] = useState({ index: 0, move: "" });
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);

  useEffect(() => {
    const retrieveSavedItems = async () => {
      const getSavedItems = async () => {
        let url = process.env.REACT_APP_BACKEND_URL + "spotify/checkSaved";
        let ids = musicItems.map((i) => i.spotInfo.id).join(",");
        let res = await axios(url, {
          headers: { Authorization: props.auth.token },
          params: { type: searchOps.q, ids },
        });
        if (res.status == 401) {
          console.log("Expired / Bad Token, re-requesting");
          window.location.replace("/");
        }
        setSavedItems(res.data.results);
      };
      await getSavedItems();
      setLoading(false);
    };
    if (musicItems.length > 0 && props.auth.type !== "noScope") {
      retrieveSavedItems();
    } else {
      setLoading(false);
    }
  }, [musicItems]);

  useEffect(() => {
    const retrieveMusicItems = async (action) => {
      const getMusicItems = async (action) => {
        setLoading(true);
        let params = {
          q: searchOps.q,
          t: searchOps.t,
          sort: searchOps.sort,
          page: page.index,
          after: action == "after" ? after : "after",
          before: action == "before" ? before : "before",
        };
        let options = {
          url: process.env.REACT_APP_BACKEND_URL + "search/getItems",
          params,
          method: "get",
          headers: {
            Authorization: props.auth.token,
            "Content-Type": "application/json",
          },
        };
        let res = await axios(options);
        setMusicItems(res.data.results);
        setAfter(res.data.after);
        setBefore(res.data.before);
      };
      setLoading(true);
      getMusicItems(action);
    };
    console.log(page.index);
    retrieveMusicItems(page.move);
  }, [page]);

  const openModal = (e) => {
    document.body.style.overflow = "hidden";
    setShareInfo(e);
    setShowModal(true);
  };

  return (
    <div className="view">
      {showModal ? (
        <Modal shareInfo={shareInfo} setShowModal={setShowModal} />
      ) : null}
      <Header />
      <div className="dashboard">
        {props.auth.type == "noScope" ? (
          <Login auth={props.auth} setauth={props.setAuth} />
        ) : null}

        <SearchOptions
          loading={loading ? true : false}
          after={after}
          before={before}
          page={page}
          setPage={setPage}
          setMusicItems={setMusicItems}
          setSearchOps={setSearchOps}
        />
        <CardContainer
          loading={loading}
          musicItems={musicItems}
          openModal={openModal}
          type={searchOps.q}
          auth={props.auth}
          savedItems={savedItems}
          setSavedItems={setSavedItems}
        />
        {loading ? null : (
          <div className="page-buttons">
            <ArrowBack before={before} page={page} setPage={setPage} />
            <ArrowNext after={after} page={page} setPage={setPage} />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
