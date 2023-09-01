import {
    useState,
    useEffect,
} from 'react';
import { Outlet, Link } from 'react-router-dom';
import AuthService from './../services/auth';
import UserService from './../services/user';

export default function UserPage() {
    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [topologies, setTopologies] = useState(Array<any>);
    const [networks, setNetworks] = useState(Array<any>);
    const [vms, setVms] = useState(Array<any>);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, []);

    useEffect(() => {
        UserService.topologies(user.id).then(
            res => {
                setTopologies(res.data);
            },
            error => {
                const errMsg =
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                     error.message ||
                     error.toString();

                console.log(errMsg);
            }
        );

        UserService.networks(user.id).then(
            res => {
                setNetworks(res.data);
            },
            error => {
                const errMsg =
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                     error.message ||
                     error.toString();

                console.log(errMsg);
            }
        );

        UserService.vms(user.id).then(
            res => {
                setVms(res.data);
            },
            error => {
                const errMsg =
                    (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                     error.message ||
                     error.toString();

                console.log(errMsg);
            }
        );
    }, [user]);

    return (
        <>
        <div id="sidebar">
            <h1>{user.name}</h1>
            <div>
                <form id="search-form" role="search">
                    <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
                    <div id="search-spinner" aria-hidden hidden={true} />
                    <div className="sr-only" aria-live="polite" ></div>
                </form>
                <form method="post">
                    <button type="submit">New</button>
                </form>
            </div>
            <nav>
                <ul>
                    <li key="topologies">
                        <Link to={`/user/${user.id}/topologies`} state={topologies}>
                            Topologies
                        </Link>
                    </li>
                    <li key="networks">
                        <Link to={`/user/${user.id}/networks`} state={networks}>
                            Networks
                        </Link>
                    </li>
                    <li key="vms">
                        <Link to={`/user/${user.id}/vms`} state={vms}>
                            Virtual Machines
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div id="detail">
            <Outlet/>
        </div>
        </>
    );
}
