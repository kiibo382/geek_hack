import http from "../http-common";

class UsersDataService {
  usersSignup(data) {
    return http.post("/users", data);
  }

  usersLogin(data) {
    return http.post("/users/login", data);
  }

  usersLogout(data) {
    return http.post("/users/logout", data);
  }

  usersList() {
    return http.get("/users");
  }

  usersGet(userName) {
    return http.get(`/users/${userName}`);
  }

  usersSelfGet() {
    return http.get(`/users/self`);
  }

  usersUpdate(data) {
    return http.put(`/users/self`, data);
  }

  usersDelete() {
    return http.delete(`/users/self`);
  }

  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new UsersDataService();