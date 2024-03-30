import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Azure from "../components/Azure";
import SendMessageModal from "../components/SendMessageModal";
import { useState } from "react";

const Connectivity = ()=>{
    const[show, setShow] = useState<boolean>(false);

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'} onClick={()=>{setShow(true)}}>Message</Button>
            </div>
            <h1>Connectivity</h1>
            <br/>
            <SendMessageModal show={show} onClose={()=>{setShow(false)}}/>
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