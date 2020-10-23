import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import FileSelector from "./FileSelector.jsx";
import ResultsView from "./ResultsView.jsx";
import Container from "./container/Container.jsx";

class App extends React.Component {
  composeVoteView() {
    return (params) => <ResultsView {...params} />;
  }
  composeFileView() {
    return (params) => <FileSelector {...params} />;
  }

  render() {
    const votes = this.composeVoteView();
    const files = this.composeFileView();

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Redirect exact from="/" to="/file-selector" />
        </Switch>
        <Container></Container>
      </Router>
    );
  }
}
export default App;
