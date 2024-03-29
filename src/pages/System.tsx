import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { api_system_getApplicationInfo, api_system_getNetworkSettings, api_system_reboot } from "../api/system";

const System = ()=>{
    // Network
    const[ ssid, setSsid ] = useState<string>('');
    const[ ipAddress, setIpAddress ] = useState<string>('');
    // System application
    const[ appVersion, setAppVersion ] = useState<string>('');

    useEffect(()=>{
        getNetworkSettings();
        getSystemApplicationInfo();
    },[]);

    // Get the network settings
    async function getNetworkSettings(){
        const result = await api_system_getNetworkSettings();
        if( result.message ){
            //Todo: handle error
            return window.alert(result.message);
        }
        if( typeof(result.ssid) === 'string' ) setSsid(result.ssid);
        if( typeof(result.ipAddress ) === 'string' ) setIpAddress(result.ipAddress);
        return;
    }

    // Get the system application info
    async function getSystemApplicationInfo(){
        const result = await api_system_getApplicationInfo();
        if( result.message ){
            //Todo: handle error
            return window.alert(result.message);
        }
        if( typeof(result.version) === 'string' ) setAppVersion(result.version);
        return;
    }

    // Request system restart
    async function requestSystemRestart(){
        // Check if user is sure about this action
        if( !window.confirm("Restart system?") ) return;

        const result = await api_system_reboot();
        if( result.message ){
            //Todo: handle error
            return window.alert(result.message);
        }
        return;
    }

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'} onClick={()=>{requestSystemRestart()}}>Restart</Button> &nbsp;
                <Button variant={'primary'}>Identify</Button>
            </div>

            <h1>System</h1>
            <br/>
            <h2>Network</h2>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>SSID</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'SSID'} value={ssid} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>IP address</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'IP address'} value={ipAddress} disabled/>
                </Col>
            </Form.Group>
            <hr/>
            <h2>System software</h2>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Version</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Version'} value={appVersion} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}></Form.Label>
                <Col sm={6}>
                    <Button variant={'danger'}>Update</Button>
                </Col>
            </Form.Group>
        </Container>
    );
}

export default System;