import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import FileSelector from "./fileselector/FileSelector.jsx";
import ResultsView from "./resultsView/ResultsView.jsx";
import Container from "./container/Container.jsx";
import "./App.css";

class App extends React.Component {
  composeVoteView() {
    return (params) => <ResultsView {...params} />;
  }
  composeFileView() {
    return (params) => <FileSelector {...params} />;
  }

  render() {

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Container></Container>
      </Router>
    );
  }
}
export default App;
