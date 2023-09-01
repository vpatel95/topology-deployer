import Axios from './api';

const USER_API_PREFIX = '/user';

class UserServiceType {
    topologies(user_id: number) {
        return Axios.get(`${USER_API_PREFIX}/${user_id}/topologies`)
            .then(response => {
                return response.data;
            })
    }

    networks(user_id: number) {
        return Axios.get(`${USER_API_PREFIX}/${user_id}/networks`)
            .then(response => {
                return response.data;
            })
    }

    vms(user_id: number) {
        return Axios.get(`${USER_API_PREFIX}/${user_id}/vms`)
            .then(response => {
                return response.data;
            })
    }
}

const UserService = new UserServiceType();
export default UserService;
