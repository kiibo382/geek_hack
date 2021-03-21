import React, { Component } from "react";
import UsersDataService from "../services/users.service";

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.usersList = this.usersList.bind(this)

    this.state = {
      users: [],
      listSubmit: false
    };
  }

  usersList() {
    UsersDataService.usersList()
      .then(response => {
        this.setState({
          users: response.data.users,
          listSubmit: true
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Users List</h4>
          <button onClick={this.usersList} className="btn">
            表示する
          </button>

          <ul className="list-group">
            <p>user</p>
            {this.state.users &&
              this.state.users.map((user) => (
                <li>
                  {user}
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
