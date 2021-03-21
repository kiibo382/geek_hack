import React, { Component } from "react";
import StaffDataService from "../services/staff.service";

export default class StaffLogin extends Component {
    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.UsersLogin = this.UsersLogin.bind(this);

        this.state = {
            email: "",
            password: "",

            loginSubmitted: false
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    UsersLogin() {
        var data = {
            email: this.state.email,
            password: this.state.password,
        };

        StaffDataService.usersLogin(data)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    password: response.data.password,

                    loginSubmitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.loginSubmitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <a href="/">Go To Home Page.</a>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="email">email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                required
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                name="password"
                            />
                        </div>

                        <button onClick={this.UsersLogin} className="btn btn-success">
                            Login
            </button>
                    </div>
                )}
            </div>
        );
    }
}

export default class StaffLogout extends Component {
    constructor(props) {
        super(props);
        this.UsersLogout = this.UsersLogout.bind(this);

        this.state = {
            logoutSubmitted: false
        };
    }

    UsersLogout() {
        StaffDataService.usersLogout()
            .then(response => {
                this.setState({
                    LogoutSubmitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.logoutSubmitted ? (
                    <div>
                        <h4>Your Logout successfully!</h4>
                        <a href="/">Go To Home Page.</a>
                    </div>
                ) : (
                    <div>

                        <button onClick={this.UsersLogout} className="btn btn-success">
                            Logout
            </button>
                    </div>
                )}
            </div>
        );
    }
}
