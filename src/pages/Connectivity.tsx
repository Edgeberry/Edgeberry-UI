import { Alert, Container } from "react-bootstrap";
import Azure from "../components/Azure";

const Connectivity = ()=>{
    return(
        <Container>
            <h2>Connectivity</h2>
            <Alert>Here comes everything related to connectivity with the cloud</Alert>
            <Azure />
        </Container>
    );
}

export default Connectivity;