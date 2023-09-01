import {
    useState,
    useEffect,
} from "react";
import {
    useLocation,
} from "react-router-dom";
import AuthService from './../services/auth';

export default function VirtualMachinePage() {
    const location = useLocation();

    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [vms, setVms] = useState([]);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, []);

    useEffect(() => {
        setVms(location.state);
    }, [location.state]);

    return (
        <div className="container overflow-hidden text-center">
            <div className="row">
                {user.name} Virtual Machines
            </div>
            <div className="row gy-5">
            { vms &&
                vms.map((vm) => (
                    <div key={vm['ID']} className="col-6">
                        <div className="p-3">{vm['name']}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}
