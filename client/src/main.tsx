import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
  timeout: 4000,
  resetOnHover: true,
  position: "topRight",
  transitionIn: "fadeInUp",
  transitionOut: "fadeOut",
  backgroundColor: "#ffffff",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
