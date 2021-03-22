import http from "../http-common";

class staffDataService {
    staffSignup(data) {
        return http.post("/staff", data);
    }

    staffLogin(data) {
        return http.post("/staff/login", data);
    }

    staffLogout(data) {
        return http.post("/staff/logout", data);
    }

    staffList() {
        return http.get("/staff");
    }

    staffGet(staffName) {
        return http.get(`/staff/${staffName}`);
    }

    staffSelfGet() {
        return http.get(`/staff/self`);
    }

    staffUpdate(data) {
        return http.put(`/staff/self`, data);
    }

    staffDelete() {
        return http.delete(`/staff/self`);
    }
}

export default new staffDataService();