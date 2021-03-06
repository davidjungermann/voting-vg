import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Container from "./container/Container.jsx";
import Footer from "./footer/Footer.jsx";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Container></Container>
        <Footer></Footer>
      </Router>
    );
  }
}
export default App;
