import React, { Component } from "react";
import { Link } from "react-router-dom";

class DelSurvey extends Component {
  deletedSurvey() {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>You have deleted survey.</h3>
        <Link to="/surveys" className="btn btn-success blue center black-text">
          Return
        </Link>
      </div>
    );
  }

  render() {
    return <div>{this.deletedSurvey()}</div>;
  }
}

export default DelSurvey;
