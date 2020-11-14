import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import GlobalContext from "./contexts";

ReactDOM.render(
  <GlobalContext>
    <App />
  </GlobalContext>,
  document.querySelector("#root")
);
