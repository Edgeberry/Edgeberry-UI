import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { api_application_getApplicationInfo, api_application_restart, api_application_stop } from "../api/application";
import NotificationBox from "../components/Notification";
import StatusIndicator from "../components/StatusIndicator";

const Application = ()=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    const[ repository, setRepository ] = useState<string>('');
    const[ accessToken, setAccessToken ] = useState<string>('');
    const[ privateRepo, setPrivateRepo ] = useState<boolean>(false);
    const[ appName, setAppName ] = useState<string>('');
    // Application info
    const[ appVersion, setAppVersion ] = useState<string>('');
    const[ cpuUsage, setCpuUsage ] = useState<string>('');
    const[ memUsage, setMemUsage ] = useState<string>('');
    const[ appStatus, setAppStatus ] = useState<string>('');


    useEffect(()=>{
        getApplicationInfo();
    },[]);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Start the application
    async function restartApplication(){
        // Check if user is sure about this action
        if( !window.confirm("Restart the application?") ) return;
        setDisabled(true);

        const result = await api_application_restart();
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }
        setDisabled(false);
        return;
    }

    // Stop the application
    async function stopApplication(){
        // Check if user is sure about this action
        if( !window.confirm("Stop the application?") ) return;
        setDisabled(true);

        const result = await api_application_stop();
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }
        setDisabled(false);
        return;
    }
    // Get the system application info
    async function getApplicationInfo(){
        const result = await api_application_getApplicationInfo();
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
        }
        if( typeof(result.name) === 'string' ) setAppName(result.name);
        if( typeof(result.version) === 'string' ) setAppVersion(result.version);
        if( typeof(result.status) === 'string' ) setAppStatus(result.status);
        if( typeof(result.memUsage) === 'string' ) setMemUsage(result.memUsage);
        if( typeof(result.cpuUsage) === 'string' ) setCpuUsage(result.cpuUsage);
        return;
    }

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'} onClick={()=>{restartApplication()}}>Restart</Button>&nbsp;
                <Button variant={'danger'} onClick={()=>{stopApplication()}}>Stop</Button>
            </div>
            <h1>Application</h1>
            <StatusIndicator message={appStatus==='online'?'Running':appStatus} type={appStatus==='online'?'success':'danger'}/>

            <br/>
            <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Repository (tarball)</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Repository'} value={repository} onChange={(e)=>{setRepository(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Private repository</Form.Label>
                    <Col sm={6}>
                        <Form.Check type={'switch'} checked={privateRepo} onChange={(e)=>{setPrivateRepo(e.target.checked)}}/>
                    </Col>
                </Form.Group>
                {privateRepo?
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Access Token</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Access Token'} value={accessToken} onChange={(e)=>{setAccessToken(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>:<></>}
                <hr/>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Application name</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Application name'} value={appName} disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>CPU usage</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'CPU usage'} value={cpuUsage} disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Memory usage</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Memory usage'} value={memUsage} disabled/>
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
            <NotificationBox message={message} isError={isError} />
        </Container>
    );
}

export default Application;