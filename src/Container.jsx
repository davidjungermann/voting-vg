import React from "react";
import FileSelector from "./FileSelector"
class Container extends React.Component {
  render() {
    return (
      <div>
        <div
          className="jumbotron text-center"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <div className="text-left">
            <span>Frågor/support: david.jungermann@gmail.com</span>
          </div>
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
