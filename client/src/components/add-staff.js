import React, { Component } from "react";
import StaffDataService from "../services/staff.service";

export default class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.onChangeStaffName = this.onChangeStaffName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.saveStaff = this.saveStaff.bind(this);

        this.state = {
            staffName: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",

            signup: false
        };
    }

    onChangeStaffName(e) {
        this.setState({
            staffName: e.target.value
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

    saveStaff() {
        var data = {
            staffName: this.state.staffName,
            password: this.state.password,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName
        };

        StaffDataService.staffSignup(data)
            .then(response => {
                this.setState({
                    staffName: response.data.staffName,
                    password: response.data.password,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,

                    signup: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.signup ? (
                    <div>
                        <h4>Your signup successed!</h4>
                        <a href="/staff/login">Go To Login Page.</a>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="staffName">staffName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="staffName"
                                required
                                value={this.state.staffName}
                                onChange={this.onChangeStaffName}
                                name="staffName"
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

                        <button onClick={this.saveStaff} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
