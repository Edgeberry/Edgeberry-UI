import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import Azure from "../components/Azure";

const Connectivity = ()=>{
    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'}>Message</Button>
            </div>
            <h1>Connectivity</h1>
            <br/>
            <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Platform</Form.Label>
                    <Col sm={6}>
                        <Form.Control as="select">
                            <option value="azure" selected>Microsoft Azure IoT</option>
                            <option value="aws" disabled>Amazon AWS IoT Core</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            <Azure />
        </Container>
    );
}

export default Connectivity;