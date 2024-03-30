import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Azure from "../components/Azure";
import SendMessageModal from "../components/SendMessageModal";
import { useEffect, useState } from "react";
import { api_connectivity_azure_getStatus } from "../api/connectivity";

const Connectivity = ()=>{
    const[show, setShow] = useState<boolean>(false);
    const[ status, setStatus ] = useState<any>({});

    useEffect(()=>{
        setInterval(()=>{getStatus()},500);
    },[]);

    async function getStatus(){
        const result = await api_connectivity_azure_getStatus();
        if(result.message){
            return;
        }
        setStatus(result);
    }

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'} onClick={()=>{setShow(true)}}>Message</Button>
            </div>
            <h1>Connectivity</h1>
            {/*{status?.connected?"Connected":status?.connecting?"Connecting...":"Disconnected"}*/}
            {status?.provisioned?(status?.connected?"Connected":(status?.connecting?"Connecting...":"Disconnected")):(status?.provisioning?"Provisioning...":"Not provisioned")}
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