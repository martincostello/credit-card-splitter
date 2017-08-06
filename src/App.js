import React, { Component } from "react";
import Calculator from "./Calculator";
import logo from "./logo.svg";
import "./App.css";

const logoAltText = "Credit Card Splitter logo";

class App extends Component {
  render() {
    return (
      <div className="app lead">
        <div className="app-header">
          <img src={logo} className="app-logo" alt={logoAltText} title={logoAltText} aria-hidden="true" />
          <h1>Credit Card Splitter</h1>
        </div>
        <div className="app-content container">
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
