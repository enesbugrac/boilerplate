import React, { Component } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/user.actions";
import { connect } from "react-redux";

class Register extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    lastname: "",
    name: "",
    passwordConfirmation: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  isFormEmpty = ({ email, password, name, lastname, passwordConfirmation }) => {
    return (
      !email.length &&
      !lastname.length &&
      !password.length &&
      !passwordConfirmation.length &&
      !name.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    }
    return true;
  };

  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{errors.message}</p>);

  isFormValid = (dataToSubmit) => {
    let errors = [];
    let error;

    if (this.isFormEmpty(dataToSubmit)) {
      error = { message: "Fiil in al fields." };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (this.isPasswordValid(dataToSubmit)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  submitForm = (e) => {
    e.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
      lastname: this.state.lastname,
      name: this.state.name,
      passwordConfirmation: this.state.passwordConfirmation,
    };

    if (this.isFormValid(dataToSubmit)) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((res) => {
          if (res.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat("Error var"),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      alert("laaann");
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Sign Up</h2>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="lastname"
                  id="lastname"
                  type="text"
                  className="validate"
                  value={this.state.lastname}
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="active" htmlFor="lastname">
                  lastname
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                  name="name"
                  id="name"
                  type="text"
                  className="validate"
                />
                <label className="active" htmlFor="name">
                  Name
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
                  required
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                />
                <label className="active" htmlFor="email">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="Type a right type email"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                  name="password"
                  id="password"
                  type="password"
                  className="validate"
                />
                <label className="active" htmlFor="password">
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  value={this.state.passwordConfirmation}
                  onChange={(e) => this.handleChange(e)}
                  name="passwordConfirmation"
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                />
                <label className="active" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
                <span
                  className="helper-text"
                  data-error="wrong"
                  data-success="right"
                />
              </div>
            </div>
            {this.state.errors.length > 0 && (
              <div>{this.displayErrors(this.state.errors)}</div>
            )}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={(e) => this.submitForm(e)}
                >
                  Create a Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Register);
