import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const System = ()=>{
    // Network
    const[ ssid, setSsid ] = useState<string>('');
    const[ ipAddress, setIpAddress ] = useState<string>('');
    // System application
    const[ appVersion, setAppVersion ] = useState<string>('');

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'}>Restart</Button> &nbsp;
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