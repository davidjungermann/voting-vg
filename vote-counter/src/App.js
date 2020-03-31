import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css'
import FileSelector from "./FileSelector";
import VoteView from "./VoteView";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="jumbotron text-center" style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
          <h1 className="display-4">Rösträknare</h1>
          <p className="lead">Västgöta Nation</p>
        </div>
        <div className="container w-50">
          <FileSelector></FileSelector>
        </div>
      </div>
    );
  }
}
export default App;
