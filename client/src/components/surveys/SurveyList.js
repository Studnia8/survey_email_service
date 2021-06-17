import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurvey() {
    return this.props.surveys.reverse().map((survey) => {
      return (
        <div class="card blue-grey darken-1" key={survey._id}>
          <div class="card-content white-text">
            <span class="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.lastResponded).toLocaleDateString()}
            </p>
          </div>
          <div class="card-action">
            <a className="black-text">Yes: {survey.yes}</a>
            <a className="black-text">No: {survey.no}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurvey()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
