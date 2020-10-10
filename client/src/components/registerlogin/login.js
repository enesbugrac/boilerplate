import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/user.actions";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  displayErrors = (errors) => <p>{errors}</p>;

  submitForm = (e) => {
    e.preventDefault();
    let dataToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };
    if (this.isFormValid(this.state)) {
      this.setState({ error: [] });
      this.props.dispatch(loginUser(dataToSubmit)).then((res) => {
        if (res.payload.loginSuccess) {
          console.log(res);
          this.props.history.push("/");
        } else {
          this.setState({
            error: "Failed to login,check your password and email",
          });
        }
      });
    } else {
      this.setState({ error: "Failed to login" });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>Login</h2>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  id="email"
                  type="email"
                  className="validate"
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
            {this.state.error.length > 0 && (
              <div>{this.displayErrors(this.state.error)}</div>
            )}
            <div className="row">
              <div className="col s12">
                <button
                  className="btn waves-effect red lighten-2"
                  type="submit"
                  name="action"
                  onClick={(e) => this.submitForm(e)}
                >
                  Login
                </button>
                <Link to="/register">
                  <button
                    className="btn waves-effect red lighten-2"
                    type="submit"
                    name="action"
                  >
                    Sign Up
                  </button>
                </Link>
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

export default connect(mapStateToProps)(Login);
