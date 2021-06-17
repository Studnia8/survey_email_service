import React from "react";
import { Link } from "react-router-dom";
import ServeyList from "./surveys/SurveyList";

const Dashboard = () => {
  return (
    <div>
      <ServeyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large green">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
