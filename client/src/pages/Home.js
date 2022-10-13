import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import FilDactualite from "../components/Fil_d'actualite";
import LeftNav from "../components/Routes/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
        {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <FilDactualite />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;