import { Col, Form, Row} from "react-bootstrap";
import AzureDeviceProvisioningService from "./AzureDeviceProvisioningService";
import AzureIoTHubConnection from "./AzureIoTHubConnection";

const Azure = ()=>{
    return(
        <>
            <Form>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Authentication type</Form.Label>
                    <Col sm={6}>
                        <Form.Control as="select">
                            <option value="sas" selected>Symmetric Key</option>
                            <option value="x509">X.509 Certificates</option>
                            <option value="tpm">Trusted Platform Module</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <hr/>
                <AzureIoTHubConnection />
                <hr/>
                <AzureDeviceProvisioningService  />
            </Form>
        </>
    );
}

export default Azure;