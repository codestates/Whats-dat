import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./pages/App";
import GlobalContext from "./contexts";

const history = createBrowserHistory();

ReactDOM.render(
  <GlobalContext>
    <Router history={history}>
      <App />
    </Router>
  </GlobalContext>,
  document.querySelector("#root")
);
