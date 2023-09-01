import React, {
    useState,
    useEffect,
} from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import {NavigationBar, NavbarLink} from 'components/Navbar';

import AuthService from 'services/auth';

export default function LandingPage() {
    const [user, setUser] = useState(AuthService.getCurrentUser());

    useEffect(() => {
        setUser(AuthService.getCurrentUser());
    }, []);

    if (user) {
        return (<Navigate to="/user" />);
    } else {
        return (
            <>
            <NavigationBar>
                <NavbarLink route="/login" name="Login" />
                <NavbarLink route="/register" name="Register" />
            </NavigationBar>
            <Container className="p-4">
                <Outlet/>
            </Container>
            </>
        );
    }
}
