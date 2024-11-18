import React from "react";
import { slide as Menu } from "react-burger-menu";

import "../styles/menu.css";

export default function SideMenu() {
  return (
    <div>
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} left>
        <main id="page-wrap">
          <a id="home" className="menu-item" href="/">
            Home
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
          {/* <a id="contact" className="menu-item" href="/contact">
            Contact
          </a> */}
        </main>
      </Menu>
    </div>
  );
}
