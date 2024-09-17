import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function Navigation() {
    return (
        <Navbar bg="danger" expand="md">
            <Navbar.Brand href="/"><img src='/public/SuperSaverLogo.png' width= '50' /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link as={NavLink} to="/" activeclassname="active">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                        Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                        Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/order" activeclassname="active">
                        Orders
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;