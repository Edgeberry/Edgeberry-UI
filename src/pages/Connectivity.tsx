import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Azure from "../components/Azure";
import SendMessageModal from "../components/SendMessageModal";
import { useEffect, useState } from "react";
import { api_connectivity_azure_getStatus } from "../api/connectivity";
import StatusIndicator from "../components/StatusIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AWS from "../components/AWS";

const Connectivity = ()=>{
    const[ platform, setPlatform ] = useState<string>('aws');

    const[show, setShow] = useState<boolean>(false);

    // Connection/provisioning status
    const[ statusMessage, setStatusMessage ] = useState<string>('');
    const[ statusType, setStatusType ] = useState<string>('');

    useEffect(()=>{
        getStatus();
        setInterval(()=>{getStatus()},900);
    },[]);

    async function getStatus(){
        const result = await api_connectivity_azure_getStatus();
        if(result.message){
            return;
        }
        ///setStatus(result);
        determineStatus( result );
    }

    function determineStatus( status:any ){
        if( status?.provisioned){
            // If the device is provisioned,
            // we check the connection status.
            if(status?.connected){
                setStatusType('success');
                setStatusMessage('Connected');
            }
            else{
                setStatusType('danger');
                setStatusMessage('Disconnected');
            }
        }
        else{
            // If the device is not provisioned,
            // we check the provisioning status
            if( status?.provisioning ){
                setStatusType('warning');
                setStatusMessage('Provisioning...');
            }
            else{
                setStatusType('danger');
                setStatusMessage('Unprovisioned');
            }
        }
    }

    return(
        <Container>
            <div className="float-right">
                <Button variant={'primary'} onClick={()=>{setShow(true)}} className="mb-2"><FontAwesomeIcon icon={faEnvelope}/> Message</Button>
            </div>
            <h1>Connectivity</h1>
            <StatusIndicator message={statusMessage} type={statusType}/>
            <br/>
            <SendMessageModal show={show} onClose={()=>{setShow(false)}}/>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Platform</Form.Label>
                <Col sm={6}>
                    <Form.Control as="select" value={platform} onChange={(e)=>{setPlatform(e.target.value)}}>
                        <option value="azure">Microsoft Azure IoT</option>
                        <option value="aws" selected>Amazon AWS IoT Core</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            {platform === 'azure'?<Azure />:<></>}
            {platform === 'aws'?<AWS />:<></>}
        </Container>
    );
}

export default Connectivity;