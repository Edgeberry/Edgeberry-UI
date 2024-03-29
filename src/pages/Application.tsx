import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

const Application = ()=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    const[ repository, setRepository ] = useState<string>('');
    const[ accessToken, setAccessToken ] = useState<string>('');
    const[ appName, setAppName ] = useState<string>('');
    const[ appVersion, setAppVersion ] = useState<string>('');

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'}>Restart</Button>
            </div>
            <h1>Application</h1>
            <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Repository</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Repository'} value={repository} onChange={(e)=>{setRepository(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Access Token</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Access Token'} value={accessToken} onChange={(e)=>{setAccessToken(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Application name</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Application name'} value={appName} disabled/>
                    </Col>
                </Form.Group>
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

export default Application;