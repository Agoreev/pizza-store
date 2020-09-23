import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useHistory, Redirect } from "react-router-dom";
import Input from "../../components/ui/input";
import OrderSummary from "./OrderSummary";
import { useQuery, useMutation } from "react-apollo";
import { GET_CART_ITEMS, CURRENT_USER_QUERY, GET_ORDERS } from "../../queries";
import { ADD_ORDER, SIGN_IN } from "../../mutations";
import Spinner from "../../components/ui/spinner";
import SmallSpinner from "../../components/ui/small-spinner";
import Subheader from "../Subheader";
import ErrorIndicator from "../../components/ui/error-indicator";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const [state, setState] = useState({
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
  });

  let history = useHistory();

  const orderHandler = async (
    e,
    data,
    addOrderMutation,
    signInMutation,
    isLoggedIn
  ) => {
    e.preventDefault();

    //1. Get data from contact form
    const formData = {};
    for (let elId in state.orderForm) {
      formData[elId] = state.orderForm[elId].value;
    }

    //2. Check if user log in, if not send login request to the server, which put JWT into cookies in response
    if (!isLoggedIn) {
      await signInMutation({
        variables: {
          phone: formData.phone,
          name: formData.name,
        },
        refetchQueries: [
          {
            query: CURRENT_USER_QUERY,
          },
        ],
      });
    }

    //3. Prepare order Object
    const orderDetails = {
      items: data.cartItems,
      currency: data.currency,
      rate: data.EURRate,
      totalPrice: data.totalPrice,
      deliveryCost: data.deliveryCost,
      date: new Date(),
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
      refetchQueries: [
        {
          query: GET_ORDERS,
        },
      ],
      update(cache) {
        cache.writeData({
          data: {
            cartItems: [],
            totalPrice: 0,
            purchased: true,
          },
        });
      },
    });

    //5. Redirect to order success page
    history.push("/order-success");
  };

  const checkValidity = (value, validation) => {
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

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    if (updatedFormElement.validation) {
      updatedFormElement.validation = checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation
      );
    }
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputId in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputId].validation.valid && formIsValid;
    }
    setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid,
    });
  };

  const formElementsArray = [];
  for (let key in state.orderForm) {
    formElementsArray.push({
      id: key,
      config: state.orderForm[key],
    });
  }

  const { data, loading, error } = useQuery(GET_CART_ITEMS);
  const [signIn, { loading: signInLoading, error: signInError }] = useMutation(
    SIGN_IN
  );
  const [
    addOrder,
    { loading: addOrderLoading, error: addOrderError },
  ] = useMutation(ADD_ORDER);

  if (loading) return <Spinner />;
  if (error || signInError || addOrderError) return <ErrorIndicator />;

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
        deliveryCost={data.deliveryCost}
      />
      <h3>Enter your contact data</h3>
      <form
        onSubmit={(e) =>
          orderHandler(e, data, addOrder, signIn, data.isLoggedIn)
        }
      >
        <Fragment>
          {formElementsArray.map((el) => {
            return (
              <Input
                key={el.id}
                elType={el.config.elType}
                label={el.id}
                value={el.config.value}
                elConfig={el.config.elConfig}
                changed={(event) => inputChangedHandler(event, el.id)}
                validation={el.config.validation}
                touched={el.config.touched}
              />
            );
          })}
          <div className={classes.SubmitWrapper}>
            <button
              type="submit"
              className="button"
              disabled={!state.formIsValid || signInLoading || addOrderLoading}
            >
              ORDER
            </button>
            {addOrderLoading || signInLoading ? <SmallSpinner /> : null}
          </div>
        </Fragment>
      </form>
    </div>
  );
};

export default Checkout;
