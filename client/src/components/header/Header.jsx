import React from "react";
// import { Search } from "@material-ui/icons";
import "./header.css";
// import { IconButton } from "@material-ui/core";
import Drawer from "../Drawer/Drawer";

import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="header">
      <div className="header-info">{user ? <Drawer /> : ""}</div>
      <div className=""></div>
    </div>
  );
}

export default Header;
