import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import FileSelector from "./FileSelector";
import ResultsView from "./ResultsView";

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
      <Router>
        <Switch>
          <Redirect exact from="/voting-vg" to="/file-selector" />
          <div>
            <div className="jumbotron text-center" style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
              <div className="text-left">
                <span>Frågor/support: david.jungermann@gmail.com</span>
              </div>
              <h1 className="display-4"><span role="img" aria-label="vote">🗳️</span> Rösträknare <span role="img" aria-label="vote">🗳️</span></h1>
              <p className="lead">Västgöta Nation</p>
            </div>
            <div className="container w-50">
              <Route path="/voting-vg/file-selector" render={files}></Route>
            </div>
            <div>
              <Route path="/voting-vg/results" render={votes}></Route>
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}
export default App;
