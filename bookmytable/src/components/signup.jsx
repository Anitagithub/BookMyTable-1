import React, { Component } from "react";
import Joi from "joi-browser";
import { Link, Redirect } from "react-router-dom";
import "./css/login.css";
import FormInput from "./subComponents/formInput";

class SignUp extends Component {
  state = {
    account: { name: "", email: "", password: "", confirmPassword: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .min(3)
      .required()
      .label("Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .min(3)
      .required()
      .label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm Password")
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

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    let errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;
    console.log("submitting signup form");
  };

  handleGotoRegistration = e => {
    this.props.closeTab(e);
    return this.props.history.push("/restaurant/registration");
    // this.history.push("/restaurant/registration");
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
              <Link onClick={this.handleGotoRegistration}>
                <small className="text">
                  <span
                    className="bg-warning"
                    style={{ padding: "5px", borderRadius: "5px" }}
                  >
                    Are you a Restaurant?
                  </span>
                </small>
                <br />
                <br />
                <hr />
              </Link>
              <small className="form-text text-muted">New User?</small>
              <h4>Welcome to SignUp</h4>
              <form onSubmit={this.handleSubmit}>
                <FormInput
                  value={this.state.account.name}
                  onChange={this.handleInputChange}
                  name="name"
                  placeholder="Name"
                  error={this.state.errors.name}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
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
                  error={this.state.errors.password}
                />
                <FormInput
                  value={this.state.account.confirmPassword}
                  onChange={this.handleInputChange}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  error={this.state.errors.confirmPassword}
                />
                <button type="submit" className="btn btn-danger">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
