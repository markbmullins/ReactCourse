import React from "react";
import { PropTypes } from "prop-types";

const TextInput = ({ id, name, value, label, onChange, error }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input
        id={id}
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
      <br />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

TextInput.defaultProps = {
  error: ""
};
export default TextInput;
