import {
    useState,
    useEffect,
} from "react";
import {
    useLocation,
} from "react-router-dom";
import AuthService from './../services/auth';

import TopologySummary from './../components/TopologyComponents';

import 'bootstrap/dist/css/bootstrap.css';

export default function TopologyPage() {
    const location = useLocation();

    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [topologies, setTopologies] = useState(Array<any>);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, []);

    useEffect(() => {
        if (!user) {
            console.log("No user in topo page");
            return;
        }

        setTopologies(location.state);
    }, [location.state, user]);

    return (
        <div className="container overflow-hidden">
            <div className="row">
                <h2>{user.name} Topologies</h2>
            </div>
            { topologies &&
                topologies.map((topology) => (
                    <TopologySummary topology={topology} />
                ))
            }
        </div>
    )
}
