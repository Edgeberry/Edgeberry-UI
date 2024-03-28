import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ()=>{
    return(
        <Navbar sticky="top" bg={'dark'} data-bs-theme={'dark'}>
            <Container>
                <Navbar.Brand href='/'>Edge Gateway</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href='/application'>
                        Application
                    </Nav.Link>
                    <Nav.Link href='/connectivity'>
                        Connectivity
                    </Nav.Link>
                    <Nav.Link href='/system'>
                        System
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;