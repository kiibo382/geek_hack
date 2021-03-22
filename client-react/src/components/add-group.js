import React, { Component } from "react";
import UsersDataService from "../services/users.service";

export default class AddUsers extends Component {
    constructor(props) {
        super(props);
        this.onChangeGroupName = this.onChangeGroupName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeProfile = this.onChangeProfile.bind(this);
        this.saveGroups = this.saveGroups.bind(this);

        this.state = {
            groupName: "",
            password: "",
            email: "",
            profile: "",

            groupAddSubmitted: false
        };
    }

    onChangeGroupName(e) {
        this.setState({
            groupName: e.target.value
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

    onChangeProfile(e) {
        this.setState({
            profile: e.target.value
        });
    }

    saveGroups() {
        var data = {
            groupName: this.state.groupName,
            password: this.state.password,
            email: this.state.email,
            profile: this.state.profile,
        };

        GroupDataService.GroupCreate(data)
            .then(response => {
                this.setState({
                    groupName: response.data.groupName,
                    password: response.data.password,
                    email: response.data.email,
                    profile: response.data.profile,

                    groupAddSubmitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.groupAddSubmitted ? (
                    <div>
                        <h4>Your group creation successed!</h4>
                        <a href={`groups/${this.state.groupName}`}>Go To Group Page.</a>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="groupName">userName</label>
                            <input
                                type="text"
                                className="form-control"
                                id="groupName"
                                required
                                value={this.state.groupName}
                                onChange={this.onChangeGroupName}
                                name="groupName"
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
                            <label htmlFor="profile">profile</label>
                            <input
                                type="text"
                                className="form-control"
                                id="profile"
                                required
                                value={this.state.profile}
                                onChange={this.onChangeProfile}
                                name="profile"
                            />
                        </div>

                        <button onClick={this.saveGroups} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
