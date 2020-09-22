import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { withRouter, Redirect } from "react-router-dom";
import Input from "../../components/ui/input";
import OrderSummary from "./OrderSummary";
import { Query, Mutation } from "react-apollo";
import { GET_CART_ITEMS, CURRENT_USER_QUERY } from "../../queries";
import { ADD_ORDER, SIGN_IN } from "../../mutations";
import Spinner from "../../components/ui/spinner";
import Subheader from "../Subheader";
import ErrorIndicator from "../../components/ui/error-indicator";
import classes from "./Checkout.module.css";

class Checkout extends Component {
  state = {
    orderForm: {
      name: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      house: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "House",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },

        touched: false,
      },
      street: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      city: {
        elType: "input",
        elConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
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
      email: {
        elType: "input",
        elConfig: {
          type: "email",
          placeholder: "E-mail",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          valid: false,
        },
        touched: false,
      },
      deliveryMethod: {
        elType: "select",
        elConfig: {
          options: [
            { value: "fastest", displayName: "Fastest" },
            { value: "cheapest", displayName: "Cheapest" },
          ],
        },
        validation: {
          required: true,
          valid: true,
        },
        value: "fastest",
      },
    },
    formIsValid: false,
  };

  orderHandler = async (
    e,
    data,
    addOrderMutation,
    signInMutation,
    isLoggedIn
  ) => {
    e.preventDefault();

    //1. Get data from contact form
    const formData = {};
    for (let elId in this.state.orderForm) {
      formData[elId] = this.state.orderForm[elId].value;
    }

    //2. Check if user log in, if not send login request to the server, which put JWT into cookies in response
    if (!isLoggedIn) {
      await signInMutation({
        variables: {
          phone: formData.phone,
          name: formData.name,
        },
        refetchQueries: {
          query: CURRENT_USER_QUERY,
        },
      });
    }

    //3. Prepare order Object
    const orderDetails = {
      items: data.cartItems,
      currency: data.currency,
      rate: data.EURRate,
      totalPrice: data.totalPrice,
    };
    const order = {
      ...formData,
      ...orderDetails,
    };

    //4. Send order to the server
    const newOrder = await addOrderMutation({
      variables: {
        order,
      },
      update(cache) {
        cache.writeData({
          data: {
            cartItems: [],
            totalPrice: 0,
          },
        });
      },
      //TODO refetch orders query
    });

    //5. Redirect to order success page
    this.props.history.push("/order-success");
  };

  checkValidity = (value, validation) => {
    const updatedValidation = { ...validation };
    updatedValidation.valid = true;
    updatedValidation.validationErrors = [];
    if (validation.required) {
      updatedValidation.valid = value.trim() !== "" && updatedValidation.valid;
      if (!updatedValidation.valid) {
        updatedValidation.validationErrors.push("This field is required");
      }
    }
    if (validation.minLength) {
      updatedValidation.valid =
        value.length >= validation.minLength && updatedValidation.valid;
      if (!updatedValidation.valid) {
        updatedValidation.validationErrors.push(
          `The minimum length is ${validation.minLength}`
        );
      }
    }
    if (validation.maxLength) {
      updatedValidation.valid =
        value.length <= validation.maxLength && updatedValidation.valid;
      if (!updatedValidation.valid) {
        updatedValidation.validationErrors.push(
          `The maximum length is ${validation.maxLength}`
        );
      }
    }
    return updatedValidation;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.validation = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].validation.valid && formIsValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    return (
      <Query query={GET_CART_ITEMS}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <ErrorIndicator />;
          const purchasingRedirect = !data.cartItems.length ? (
            <Redirect to="/" />
          ) : null;
          return (
            <div className={classes.Checkout}>
              {purchasingRedirect}
              <Link to="/cart" className={classes.EditCartBtn}>
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;Edit cart&nbsp;
                <FontAwesomeIcon icon="shopping-cart" />
              </Link>
              <Subheader title="Checkout" />
              <OrderSummary
                cartItems={data.cartItems}
                currency={data.currency}
                rate={data.EURRate}
                totalPrice={data.totalPrice}
              />
              <h3>Enter your contact data</h3>
              <form onSubmit={(e) => this.orderHandler(e, data)}>
                <Mutation mutation={SIGN_IN}>
                  {(signIn) => {
                    return (
                      <Mutation mutation={ADD_ORDER}>
                        {(addOrder) => {
                          return (
                            <Fragment>
                              {formElementsArray.map((el) => {
                                return (
                                  <Input
                                    key={el.id}
                                    elType={el.config.elType}
                                    label={el.id}
                                    value={el.config.value}
                                    elConfig={el.config.elConfig}
                                    changed={(event) =>
                                      this.inputChangedHandler(event, el.id)
                                    }
                                    validation={el.config.validation}
                                    touched={el.config.touched}
                                  />
                                );
                              })}
                              <button
                                type="submit"
                                className="button"
                                disabled={!this.state.formIsValid}
                                onClick={(e) =>
                                  this.orderHandler(
                                    e,
                                    data,
                                    addOrder,
                                    signIn,
                                    data.isLoggedIn
                                  )
                                }
                              >
                                ORDER
                              </button>
                            </Fragment>
                          );
                        }}
                      </Mutation>
                    );
                  }}
                </Mutation>
              </form>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Checkout);
