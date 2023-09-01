import {
    useState,
    useEffect,
} from "react";
import {
    useLocation,
} from "react-router-dom";
import AuthService from './../services/auth';

export default function NetworkPage() {
    const location = useLocation();

    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [networks, setNetworks] = useState([]);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, []);

    useEffect(() => {
        setNetworks(location.state);
    }, [location.state]);

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
