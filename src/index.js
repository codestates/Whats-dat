import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./pages/App";
import GlobalContext from "./contexts";

ReactDOM.render(
  <GlobalContext>
    <Router>
      <App />
    </Router>
  </GlobalContext>,
  document.querySelector("#root")
);
