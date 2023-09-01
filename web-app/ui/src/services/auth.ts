import Axios from './api';

const AUTH_API_PREFIX = '/auth';

class AuthServiceType {
    login(username: string, password: string) {
        return Axios.post(`${AUTH_API_PREFIX}/login`, {username, password})
            .then(res => {
                console.log('Login Success. Message:', res.data);
                if (res.data.user) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                }
                return res.data;
            });
    }

    logout() {
    }

    register(name: string, username: string, email: string, password: string) {
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

const AuthService = new AuthServiceType();
export default AuthService;
