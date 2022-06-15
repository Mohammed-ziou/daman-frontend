import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import { useSelector } from "react-redux";
// import FormTopSection from "../../components/topsection/FormTopSection";
// import StorageIcon from "@material-ui/icons/Storage";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import FolderOpenIcon from "@material-ui/icons/FolderOpen";
// import { IconButton } from "@material-ui/core";
// import Card from "./Card";
// import axios from "axios";

function Homepage() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <div className="container">
        <div className="row">
          <h1>Daman Forms Survey</h1>
          <p>A service for making Survey forms for the Daman insituition</p>
        </div>
        <div className="row">
          {!user ? (
            <>
              <div className="col-12 col-md-6">
                <button className="btn btn-primary">
                  <Link to="/login"> Login</Link>
                </button>
              </div>
              <div className="col-12 col-md-6">
                <button className="btn btn-secondary">
                  <Link to="/register">Register</Link>
                </button>
              </div>
            </>
          ) : (
            <div className="col-12">
              <button className="btn btn-secondary">
                <Link to="/forms">Build Forms</Link>
              </button>
            </div>
          )}
        </div>
      </div>
      <footer>
        <a href="https://hololtech.ly">All right to HololTech</a>
      </footer>
    </>
  );
}

export default Homepage;
