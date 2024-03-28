import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ()=>{
    return(
        <Navbar sticky="top" className="navbar-dark bg-dark">
            <Container>
                <Link className="navbar-brand navbar-dark bg-dark" to='/'>
                    <div className="navbar-text navbar-dark">Edge Gateway</div>
                </Link>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;