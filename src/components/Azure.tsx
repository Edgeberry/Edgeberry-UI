import { Col, Form, Row} from "react-bootstrap";
import AzureDeviceProvisioningService from "./AzureDeviceProvisioningService";
import AzureIoTHubConnection from "./AzureIoTHubConnection";
import { useState } from "react";

const Azure = ()=>{
    const[ useProvisioning, setUseProvisioning ] = useState<boolean>(true);
    const[ authenticationType, setAuthenticationType ] = useState<string>('');

    return(
        <>
            <Form>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Authentication type</Form.Label>
                    <Col sm={6}>
                        <Form.Control as="select" value={authenticationType} onChange={(e)=>{setAuthenticationType(e.target.value)}}>
                            <option value="sas" selected>Symmetric Key</option>
                            <option value="x509">X.509 Certificates</option>
                            <option value="tpm" disabled>Trusted Platform Module</option>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Provisioning Service</Form.Label>
                    <Col sm={6}>
                        <Form.Check type={'switch'} checked={useProvisioning} onChange={(e)=>{setUseProvisioning(e.target.checked)}}/>
                    </Col>
                </Form.Group>
                <hr/>
                <AzureIoTHubConnection authenticationType={authenticationType} disabled={useProvisioning}/>
                <hr/>
                <AzureDeviceProvisioningService authenticationType={authenticationType} disabled={!useProvisioning}/>
            </Form>
        </>
    );
}

export default Azure;