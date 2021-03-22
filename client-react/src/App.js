import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUsers from "./components/add-users.component";
import AddStaff from "./components/add-staff";
import { UsersLogin, UsersLogout } from "./components/auth-users.component";
import { StaffLogin, StaffLogout } from "./components/auth-staff";
import UsersList from "./components/users-list.component";
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import StaffPage from './components/StaffPage';
import GroupPage from './components/GroupPage';


class App extends Component {
  render() {
    const isUserAuthenticated = localStorage.getItem('user') != null;
    const isStaffAuthenticated = localStorage.getItem('staff') != null
    if (isUserAuthenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/users"} className="navbar-brand">
              ambass
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/users/logout"} className="nav-link">
                  UsersLogout
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={UserPage} />
              <Route exact path="/" component={GroupPage} />
              <Route exact path="/users" component={UsersList} />
              <Route exact path="/users/signup" component={AddUsers} />
              {/* <Route exact path="/users/:userName" component={UsersProfile} /> */}
              <Route exact path="/users/logout" component={UsersLogout} />
              {/* <Route exact path="/users/self" component={UsersProfile} /> */}
              <Route exact path="/users" component={UsersList} />
            </Switch>
          </div>
        </div>
      );
    } else if (isStaffAuthenticated) {
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/users"} className="navbar-brand">
              ambass
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/staff/logout"} className="nav-link">
                  StaffLogout
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={StaffPage} />
              <Route exact path="/" component={GroupPage} />
              <Route exact path="/users" component={UsersList} />
              {/* <Route exact path="/staff/:staffName" component={StaffProfile} /> */}
              <Route exact path="/staff/logout" component={StaffLogout} />
              {/* <Route exact path="/staff/self" component={StaffProfile} /> */}
            </Switch>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/users"} className="navbar-brand">
              ambass
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/users/signup"} className="nav-link">
                  UsersSignup
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/users/login"} className="nav-link">
                  UsersLogin
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/staff/signup"} className="nav-link">
                  StaffSignup
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/staff/login"} className="nav-link">
                  StaffLogin
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/users/signup" component={AddUsers} />
              <Route exact path="/users/login" component={UsersLogin} />
              <Route exact path="/staff/signup" component={AddStaff} />
              <Route exact path="/staff/login" component={StaffLogin} />
            </Switch>
          </div>
        </div>
      );
    }
  }
}

export default App;
