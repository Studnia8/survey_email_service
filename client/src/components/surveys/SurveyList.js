import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys, deleteSurvey } from "../../actions";
import { Link } from "react-router-dom";

class SurveyList extends Component {
  componentWillMount() {
    this.props.fetchSurveys();
  }

  renderSurvey() {
    // make sure if user has no survey lead to create one
    if (
      this.props.surveys.length === 0 &&
      !this.props.surveys.length === null
    ) {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>You have no surveys.</h3>
          <p>Please click on add button on bottom right.</p>
        </div>
      );
      // if user has survey display them
    } else {
      return this.props.surveys.reverse().map((survey) => {
        return (
          <div className="card blue-grey darken-1" key={survey._id}>
            <div className="card-content white-text">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent on: {new Date(survey.lastResponded).toLocaleDateString()}
              </p>
            </div>
            <div class="card-action">
              <a className="black-text">Yes: {survey.yes}</a>
              <a className="black-text">No: {survey.no}</a>
              <Link to="/deleted">
                <button
                  onClick={() => this.props.deleteSurvey(survey._id)}
                  className="btn btn-success red right white-text"
                >
                  DELETE
                  <i className="material-icons right">delete</i>
                </button>
              </Link>
            </div>
          </div>
        );
      });
    }
  }

  deletedSurvey() {
    if (
      this.props.surveys.length === 0 &&
      !this.props.surveys.length === null
    ) {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>You have no surveys.</h3>
          <p>Please click on add button on bottom right.</p>
        </div>
      );
      // if user has survey display them
    } else {
      return (
        <div style={{ textAlign: "center" }}>
          <h3>You have deleted survey.</h3>
          <Link
            to="/surveys"
            className="btn btn-success blue center black-text"
          >
            Return
          </Link>
        </div>
      );
    }
  }

  render() {
    if (this.props.surveys) {
      return <div>{this.renderSurvey()}</div>;
    } else {
      return <div>{this.deletedSurvey()}</div>;
    }
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
  SurveyList
);
