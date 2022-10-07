import React from "react";
import ReactDOM from "react-dom";
import "../src/style/index.css";
import { Phaser } from "./components/phaser/Phaser";

ReactDOM.render(
  <React.StrictMode>
    <Phaser />
  </React.StrictMode>,
  document.getElementById("root")
);
