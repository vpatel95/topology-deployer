import { ReactNode, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { LinkContainer } from 'react-router-bootstrap';

interface NavigationBarProps {
    children?: ReactNode;
}

interface NavbarLinkProps {
    route: string;
    name: string;
    state?: Array<any>;
}

export function NavbarLink({route, name, ...props}: NavbarLinkProps) {
    return (
        <LinkContainer to={route} {...props}>
            <Nav.Link>{name}</Nav.Link>
        </LinkContainer>
    )
}

export function Sidebar({ children, ...props }: NavigationBarProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Nav className="me-auto flex-column bg-body-tertiary">
            {children}
        </Nav>
    </>
  );
}

export function NavigationBar({ children, ...props }: NavigationBarProps) {
  return (
    <Navbar expand="lg" className="bg-body-secondary ps-3">
        <LinkContainer to={"/"}>
            <Navbar.Brand>Topology Deployer</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            { children }
            { false ? (
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            ): (<></>)}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}
