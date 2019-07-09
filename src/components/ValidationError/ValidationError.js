import React from "react";
import PropTypes from "prop-types";
import "./ValidationError.css";
export default function ValidationError(props) {
  if (props.hasError) {
    return (
      <div className="error" id={props.id}>
        {props.message}
      </div>
    );
  }

  return <></>;
}

ValidationError.propTypes = {
  hasError: PropTypes.bool,
  message: PropTypes.string
};
