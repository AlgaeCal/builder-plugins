// eslint-disable-next-line no-unused-vars
import { jsx } from "@emotion/core"; // Important! This line is necessary for the plugin to work with Builder.io
import React, { useState } from "react";
import { Builder } from "@builder.io/react";
import "./index.css";
import PropTypes from "prop-types";

function ColumnLayouts(props) {
  const [selected, setSelected] = useState(props.value || 1);

  const handleClick = (index) => {
    if (index === selected) {
      return;
    }
    setSelected(index);
    props.onChange(index);
  };

  return (
    <div
      className={
        "column-layouts-editor" + (props.className ? ` ${props.className}` : "")
      }
    >
      <button
        className={`column-button column-1-of-1 ${
          selected === 1 ? "selected" : ""
        }`}
        value={"1/1"}
        onClick={() => handleClick(1)}
      >
        <span className="column"> 1/1 </span>
      </button>
      <button
        className={`column-button column-1-of-2 ${
          selected === 2 ? "selected" : ""
        }`}
        value={"1/2"}
        onClick={() => handleClick(2)}
      >
        <span className="column"> 1/2 </span>
        <span className="column"> 1/2 </span>
      </button>
      <button
        className={`column-button column-1-of-3 ${
          selected === 3 ? "selected" : ""
        }`}
        value={"1/3"}
        onClick={() => handleClick(3)}
      >
        <span className="column"> 1/3 </span>
        <span className="column"> 1/3 </span>
        <span className="column"> 1/3 </span>
      </button>
      <button
        className={`column-button column-2-of-3 ${
          selected === 4 ? "selected" : ""
        }`}
        value={"2/3-1/3"}
        onClick={() => handleClick(4)}
      >
        <span className="column"> 2/3 </span>
        <span className="column"> 1/3 </span>
      </button>
      <button
        className={`column-button column-2-of-3-reversed ${
          selected === 5 ? "selected" : ""
        }`}
        value={"1/3-2/3"}
        onClick={() => handleClick(5)}
      >
        <span className="column"> 1/3 </span>
        <span className="column"> 2/3 </span>
      </button>
    </div>
  );
}

ColumnLayouts.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Builder.registerEditor({
  name: "ColumnLayouts",
  component: ColumnLayouts,
  defaultValue: 1,
});
