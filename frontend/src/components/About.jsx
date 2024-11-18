import React, { useCallback, useState, useEffect } from "react";
import "../styles/about.css";

import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function about({}) {
  return (
    <div className="about">
      このアプリは、ポケモンの
      <br />
      このアプリの使い方を知りたい人は、以下のページのReadMeをご参照ください！
      <br />
      <a id="github" href="https://github.com/KSK-w/ccFullStuckProjectSolo">
        https://github.com/KSK-w/ccFullStuckProjectSolo
      </a>
      <br />
      <a id="home" href="/">
        ホームへ
      </a>
    </div>
  );
}
