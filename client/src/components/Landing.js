import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Emaily!</h1>
        <p>Collect feedback from your clients!</p>
        <p>In order to start click button on bottom right.</p>
        <div className="fixed-action-btn">
          <Link to="/surveys" className="btn-floating btn-large green">
            <i className="large material-icons">assignment</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;
