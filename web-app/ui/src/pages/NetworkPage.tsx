import {
    Component,
    useState,
    useEffect,
} from "react";
import {
    Navigate,
    useLocation,
} from "react-router-dom";
import AuthService from './../services/auth';
import UserService from './../services/user';

import 'bootstrap/dist/css/bootstrap.css';

export default function NetworkPage() {
    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [networks, setNetworks] = useState([]);

    useEffect(() => {
        setNetworks(location.state);
    }, []);

    return (
        <div className="container overflow-hidden text-center">
            <div className="row">
                {user.name} Networks
            </div>
            <div className="row gy-5">
            { networks &&
                networks.map((network) => (
                    <div key={network['ID']} className="col-6">
                        <div className="p-3">{network['name']}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
