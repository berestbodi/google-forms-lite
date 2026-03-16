import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import StoreProvider from "./components/StoreProvider/StoreProvider";

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
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
);
