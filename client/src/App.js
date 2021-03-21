import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUsers from "./components/add-users.component";
import UsersLogin from "./components/login-users.component";
import Users from "./components/users";
import UsersList from "./components/users-list.component";
import AuthUserProvider, { useAuthUser } from './AuthUserContext';
import LogoutPage from './LogoutPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';


const UnAuthRoute = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser != null
  const { from } = useLocation().state

  if (isAuthenticated) {
    console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
    return <Redirect to={from ?? "/"} />
  } else {
    return <Route {...props} />
  }
}

const PrivateRoute = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser != null
  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    console.log(`ログインしていないユーザーは${props.path}へはアクセスできません`)
    return <Redirect to={{ pathname: "/login", state: { from: props.location?.pathname } }} />
  }
}

const StaffUnAuthRoute = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser != null
  const { from } = useLocation().state

  if (isAuthenticated) {
    console.log(`ログイン済みのユーザーは${props.path}へはアクセスできません`)
    return <Redirect to={from ?? "/"} />
  } else {
    return <Route {...props} />
  }
}

const StaffPrivateRoute = ({ ...props }) => {
  const authUser = useAuthUser()
  const isAuthenticated = authUser != null
  if (isAuthenticated) {
    return <Route {...props} />
  } else {
    console.log(`ログインしていないユーザーは${props.path}へはアクセスできません`)
    return <Redirect to={{ pathname: "/login", state: { from: props.location?.pathname } }} />
  }
}


class App extends Component {
  render() {
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
              <Link to={"/users/logout"} className="nav-link">
                UsersLogout
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/signup"} className="nav-link">
                StaffSignup
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/login"} className="nav-link">
                StaffLogin
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users/logout"} className="nav-link">
                StaffLogout
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <AuthUserProvider>
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={UsersPage} />
                <StaffPrivateRoute exact path="/" component={StaffPage} />
                <UnAuthRoute exact path="/users" component={UsersList} />
                <UnAuthRoute exact path="/users/signup" component={AddUsers} />
                <PrivateRoute exact path="/users/:userName" component={UsersProfile} />
                <UnAuthRoute exact path="/users/login" component={UsersLogin} />
                <PrivateRoute exact path="/users/logout" component={UsersLogout} />
                <PrivateRoute exact path="/users/self" component={UsersProfile} />
                <Redirect to="/" />
              </Switch>
            </Router>
          </AuthUserProvider>
        </div>
      </div>
    );
  }
}

export default App;
