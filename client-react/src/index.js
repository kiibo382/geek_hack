import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Chat } from './components/chat/Chat';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

const isUserAuthenticated = localStorage.getItem('user') != null;
const isStaffAuthenticated = localStorage.getItem('staff') != null;
if (isUserAuthenticated || isStaffAuthenticated) {
  ReactDOM.render(
    <React.StrictMode>
      <Chat />
    </React.StrictMode>,
    document.getElementById("sub")
  );
}

serviceWorker.unregister();
