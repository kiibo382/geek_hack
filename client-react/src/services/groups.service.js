import http from "../http-common";

class UsersDataService {
    groupCreate(data) {
        return http.post("/users", data);
    }

    groupList() {
        return http.get("/group");
    }

    groupGet(groupName) {
        return http.get(`/group/${groupName}`);
    }

    groupSelfGet(groupName) {
        return http.get(`/group/${groupName}`);
    }

    groupUpdate(data) {
        return http.put(`/group/self`, data);
    }

    groupDelete(groupName) {
        return http.delete(`/group/${groupName}`);
    }
}

export default new UsersDataService();