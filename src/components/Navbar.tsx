import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ()=>{
    return(
        <Navbar sticky="top">
            <Container>
                <Link className="navbar-brand" to='/'>
                    <div className="navbar-text">Edge Gateway</div>
                </Link>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;