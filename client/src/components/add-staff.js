import React, { Component } from "react";
import StaffDataService from "../services/staff.service";

export default class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.saveUsers = this.saveUsers.bind(this);

        this.state = {
            userName: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",

            signupSubmitted: false
        };
    }

    onChangeUserName(e) {
        this.setState({
            userName: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    saveUsers() {
        var data = {
            userName: this.state.userName,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        StaffDataService.usersSignup(data)
            .then(response => {
                this.setState({
                    userName: response.data.userName,
                    password: response.data.password,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,

                    signupSubmitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>Your signup successed!</h4>
                        <a href="/staff/login">Go To Login Page.</a>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="userName">staffName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                required
                                value={this.state.userName}
                                onChange={this.onChangeUserName}
                                name="userName"
                            />
                        </div>

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

                        <div className="form-group">
                            <label htmlFor="firstName">firstName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                required
                                value={this.state.firstName}
                                onChange={this.onChangeFirstName}
                                name="firstName"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">lastName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                required
                                value={this.state.lastName}
                                onChange={this.onChangeLastName}
                                name="lastName"
                            />
                        </div>

                        <button onClick={this.saveUsers} className="btn btn-success">
                            Submit
            </button>
                    </div>
                )}
            </div>
        );
    }
}
