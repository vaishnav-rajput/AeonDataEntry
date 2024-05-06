import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { Toaster } from "react-hot-toast";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if(process.env.NODE_ENV == 'production') disableReactDevTools();

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </Provider>
    
  </>
);
 