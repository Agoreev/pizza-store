import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";
import { SIGN_IN } from "../../../mutations";
import { CURRENT_USER_QUERY } from "../../../queries";
import Input from "../../../components/ui/input";
import classes from "./SignIn.module.css";
import Spinner from "../../../components/ui/spinner";
import ErrorIndicator from "../../../components/ui/error-indicator";

const SignIn = () => {
  const [state, setState] = useState({
    controls: {
      phone: {
        elType: "maskedInput",
        elConfig: {
          type: "tel",
          placeholder: "Phone",
        },
        value: "",
        validation: {
          required: true,
          maxLength: 11,
          valid: false,
        },
        touched: false,
      },
      name: {
        elType: "maskedInput",
        elConfig: {
          type: "text",
          placeholder: "Name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
    },
    formIsValid: false,
  });

  const { data: userData } = useQuery(CURRENT_USER_QUERY);
  const [signIn, { loading, error }] = useMutation(SIGN_IN);

  const history = useHistory();

  if (loading) return <Spinner />;
  if (error) return <ErrorIndicator />;

  const checkValidity = (value, validation) => {
    let { valid, validationErrors, ...rules } = { ...validation };
    valid = true;
    validationErrors = [];

    if (rules.required && value.trim() === "") {
      valid = false;
      validationErrors.push("Field is required");
    }

    if (rules.minLength && value.length <= rules.minLength) {
      valid = false;
      validationErrors.push(`Minimum length is ${rules.minLength}`);
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      valid = false;
      validationErrors.push(`Maximum length is ${rules.maxLength}`);
    }

    if (rules.isEmail) {
      const pattern = /^\S+@\S+\.\S+$/;
      if (!pattern.test(value)) {
        valid = false;
        validationErrors.push("Email is not valid");
      }
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      if (!pattern.test(value)) {
        valid = false;
        validationErrors.push("Enter numeric value");
      }
    }
    const newValidation = {
      ...validation,
      valid,
      validationErrors,
    };
    return newValidation;
  };

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...state.controls,
      [controlName]: {
        ...state.controls[controlName],
        value: event.target.value,
        validation: checkValidity(
          event.target.value,
          state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    let formIsValid = true;
    for (let inputId in updatedControls) {
      formIsValid = updatedControls[inputId].validation.valid && formIsValid;
    }
    setState({
      controls: updatedControls,
      formIsValid: formIsValid,
    });
  };

  const submitHandler = (event, signIn) => {
    event.preventDefault();
    const { phone, name } = state.controls;
    signIn({
      variables: { phone: phone.value, name: name.value },

      refetchQueries: [
        {
          query: CURRENT_USER_QUERY,
        },
      ],
    });
    history.push("/");
  };

  const formElementsArray = [];
  for (let key in state.controls) {
    formElementsArray.push({
      id: key,
      config: state.controls[key],
    });
  }
  const form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elType={formElement.config.elType}
      label={formElement.id}
      value={formElement.config.value}
      elConfig={formElement.config.elConfig}
      changed={(event) => inputChangedHandler(event, formElement.id)}
      validation={formElement.config.validation}
      touched={formElement.config.touched}
    />
  ));

  let authRedirect = null;
  if (!!userData && userData._id) {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <div className={classes.SignIn}>
      {authRedirect}
      <form onSubmit={(e) => submitHandler(e, signIn)}>
        {form}
        <button type="submit" className="button" disabled={!state.formIsValid}>
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default SignIn;
