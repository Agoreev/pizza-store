import React, { Fragment, Component } from "react";
import classes from "./modal.module.css";
import Backdrop from "../backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }
  render() {
    const { show, modalClosed, children } = this.props;
    return (
      <Fragment>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? "translateY(0)" : "translateY(-100vh)",
            opacity: show ? 1 : 0,
          }}
        >
          {children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
