import React from "react";
import classes from "./input.module.css";

const input = ({
  elType,
  elConfig,
  value,
  label,
  changed,
  validation,
  touched,
}) => {
  let inputElement = null;
  let errors = null;
  const inputClasses = [classes.Input];

  if (validation && !validation.valid && touched) {
    inputClasses.push(classes.Invalid);
    errors = validation.validationErrors.map((err, index) => {
      return (
        <p key={index} className={classes.ValidationError}>
          {err}
        </p>
      );
    });
  }
  switch (elType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...elConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...elConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={value}
          onChange={changed}
        >
          {elConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...elConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {errors}
    </div>
  );
};

export default input;
