import {
    useState,
    useEffect,
} from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthService from 'services/auth';
import UserService from 'services/user';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {Sidebar, NavigationBar, NavbarLink} from 'components/Navbar';

export default function UserPage() {
    const [user, setUser] = useState(AuthService.getCurrentUser());
    const [topologies, setTopologies] = useState(Array<any>);
    const [networks, setNetworks] = useState(Array<any>);
    const [vms, setVms] = useState(Array<any>);

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, []);

    useEffect(() => {
        if (!user) {
            return;
        }

        UserService.topologies(user.id).then(
            res => {
                setTopologies(res.data);
            },
            error => {
                const errMsg =
                    (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();

                console.log(errMsg);
            }
        );

        UserService.networks(user.id).then(
            res => {
                setNetworks(res.data);
            },
            error => {
                const errMsg =
                    (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();

                console.log(errMsg);
            }
        );

        UserService.vms(user.id).then(
            res => {
                setVms(res.data);
            },
            error => {
                const errMsg =
                    (error.response && error.response.data && error.response.data.message) ||
                     error.message || error.toString();

                console.log(errMsg);
            }
        );
    }, [user]);

    if (!user) {
        return (<Navigate to="/login" replace={true} />);
    } else {
        return (
            <>
            <Container fluid className="p-0 flex-column">
                <Row className="p-0">
                    <NavigationBar>
                        <NavbarLink route={`/user/${user.id}/topologies`}
                            name="Topologies" state={topologies} />
                        <NavbarLink route={`/user/${user.id}/networks`}
                            name="Networks" state={networks} />
                        <NavbarLink route={`/user/${user.id}/vms`}
                            name="Virtual Machines" state={vms} />
                        <NavbarLink route="/logout" name="Logout" />
                    </NavigationBar>
                </Row>
                <Row className="p-0 flex-row">
                    <Col xs={2} className="ps-5 pt-5">
                        <Sidebar>
                            <NavbarLink route={`/user/${user.id}/topologies`}
                                name="Topologies" state={topologies} />
                            <NavbarLink route={`/user/${user.id}/networks`}
                                name="Networks" state={networks} />
                            <NavbarLink route={`/user/${user.id}/vms`}
                                name="Virtual Machines" state={vms} />
                        </Sidebar>
                    </Col>
                    <Col xs={10} className="ps-0">
                        <Container fluid className="p-4">
                            <Outlet/>
                        </Container>
                    </Col>
                    <Col className="ps-0"></Col>
                </Row>
            </Container>
            </>
        );
    }

}
