import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./Redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Auth0Provider
    domain="dev-yl2ra7dk.us.auth0.com"
    clientId="tuq7hBIMP0FnpmNVpJtyhMzgljB2StF7"
    redirectUri={window.location.origin}
    audience="udacity-capstone-api"
    scope="rate:movies"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
