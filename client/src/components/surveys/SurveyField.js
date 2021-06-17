// survey field contains logic to render single label and text input
import React from "react";

const field = ({ input, label, meta: { error, touched } }) => {
  console.log(input);
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }}></input>
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
        {/* if touched is true and error contains string print error */}
      </div>
    </div>
  );
};

export default field;
