import { Alert, Container } from "react-bootstrap";
import AzureIoTHubConnection from "../components/AzureIoTHubConnection";

const Connectivity = ()=>{
    return(
        <Container>
            <h2>Connectivity</h2>
            <Alert>Here comes everything related to connectivity with the cloud</Alert>
            <AzureIoTHubConnection />
        </Container>
    );
}

export default Connectivity;