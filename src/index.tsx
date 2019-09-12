import React from "react";
import ReactDOM from "react-dom";

// Components imports
import { UserProvider } from "./stateManagement/contexts/userContext";
import ErrorBoundary from "./components/errorBoundaries/globalErrorBoundary";
import App from "./components/App";

// Styling imports
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import * as serviceWorker from "./serviceWorker";
import { alertErrorBoundary } from "./components/errorBoundaries/alertErrorBoundary";

ReactDOM.render(
  <ErrorBoundary>
    <UserProvider>{React.createElement(alertErrorBoundary(App))}</UserProvider>
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
