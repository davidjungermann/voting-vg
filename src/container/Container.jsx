import React from "react";
import FileSelector from "../fileselector/FileSelector.jsx"
import "./Container.css";
class Container extends React.Component {
  render() {
    return (
      <div className="container-root">
        <div
          className="jumbotron text-center"
        >
          <h1 className="display-4">
            Rösträknare{" "}
          </h1>
          <p className="lead">Västgöta Nation</p>
        </div>
        <FileSelector></FileSelector>
      </div>
    );
  }
}

export default Container;
