import { Col, Form, Row} from "react-bootstrap";
import { useState } from "react";
import AWSIoTCoreConnection from "./AWSIoTCoreConnection";
import AWSIoTCoreProvisioning from "./AWSIoTCoreProvisioning";

const AWS = ()=>{
    const[ useProvisioning, setUseProvisioning ] = useState<boolean>(false);
    const[ authenticationType, setAuthenticationType ] = useState<string>('x509');

    return(
        <>
            <Form>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Authentication type</Form.Label>
                    <Col sm={6}>
                        <Form.Control as="select" value={authenticationType} onChange={(e)=>{setAuthenticationType(e.target.value)}}>
                            <option value="x509">X.509 Certificates</option>
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
                <AWSIoTCoreConnection authenticationType={authenticationType} setAuthenticationType={setAuthenticationType} disabled={useProvisioning}/>
                <hr/>
                <AWSIoTCoreProvisioning authenticationType={authenticationType} setAuthenticationType={setAuthenticationType} disabled={!useProvisioning}/>

            </Form>
        </>
    );
}

export default AWS;