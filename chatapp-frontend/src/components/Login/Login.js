import React, { Component } from "react";
import "./Login.css";
import * as socketConnection from "../../socketHandler";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.login = this.login.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  login(e) {
    e.preventDefault();
    socketConnection.login(this.state.username);
  }

  render() {
    return (
      <div className="loginBox">
        <p> Login and start chatting</p>
        <form>
          <label htmlFor="username" className="inputLabel ">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="inputElement"
            value={this.state.username}
            onChange={evt => this.updateInputValue(evt)}
          />
          <button onClick={this.login}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
