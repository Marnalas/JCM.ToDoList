import React from "react";
import ReactDOM from "react-dom";

// Components imports
import { UserProvider } from "./stateManagement/contexts/userContext";
import GlobalErrorBoundary from "./components/errorBoundaries/GlobalErrorBoundary";
import App from "./components/App";

// Styling imports
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import * as serviceWorker from "./serviceWorker";
import { withAlertErrorBoundary } from "./components/errorBoundaries/withAlertErrorBoundary";

const AppWithAlertError = withAlertErrorBoundary(App);

ReactDOM.render(
  <GlobalErrorBoundary>
    <UserProvider>
      <AppWithAlertError />
    </UserProvider>
  </GlobalErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
