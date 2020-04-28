import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import App from "./App";
import "./styles.css";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root'));
serviceWorker.unregister();