import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";

function Profil() {
  const uid = useContext(UidContext);

    return (
      <div className="profil-page">
        {uid ? (
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <div className="log-container">
            <Log signin={false} signup={true}/>
            <div className="img-container">
                <img src="./img/log.svg" alt="img-logo" />
            </div>
          </div>
        )}
      </div>
    )
}

export default Profil;