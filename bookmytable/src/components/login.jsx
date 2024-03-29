import React, { Component } from "react";
import Joi from "joi-browser";

import FormInput from "./subComponents/formInput";

import welcomeback from "./images/welcomeback.jpg";

import "./css/login.css";

class Login extends Component {
  state = { account: { email: "", password: "" }, errors: {} };

  schema = {
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(3)
      .required()
      .label("Password")
  };
  handleInputChange = e => {
    let account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  validate = () => {
    let errors = {};

    let validationResult = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    if (!validationResult.error) return null;

    for (let error of validationResult.error.details) {
      errors[error.path[0]] = error.message;
    }
    // if (this.state.account.email.trim() === "") {
    //   errors.email = "Email is req.";
    // }
    // if (this.state.account.password.trim() === "") {
    //   errors.password = "Password is req.";
    // }

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    let errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
    console.log("submitting LOGIN form");
  };

  render() {
    return (
      <div
        className="container-fluid"
        style={{ width: "100%", height: "100%", padding: "0" }}
      >
        <div
          className="row"
          style={{ margin: "0", width: "100%", height: "100%" }}
        >
          <div className="col" />
          <div className="col-5 loginContainer">
            <button onClick={this.props.closeTab} className="btn btn-danger">
              <i className="fa fa-times" aria-hidden="true" />
            </button>
            <div className="loginDiv">
              <small class="form-text text-muted">Already a User?</small>
              <h4>Login to continue</h4>
              <form onSubmit={this.handleSubmit}>
                <FormInput
                  value={this.state.account.email}
                  onChange={this.handleInputChange}
                  name="email"
                  placeholder="Enter email"
                  error={this.state.errors.email}
                />
                <FormInput
                  value={this.state.account.password}
                  onChange={this.handleInputChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </form>
            </div>
            <img src={welcomeback} alt="happy image" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
