import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { api_system_getApplicationInfo, api_system_getNetworkSettings, api_system_identify, api_system_reboot, api_system_updateSystemSoftware } from "../api/system";
import NotificationBox from "../components/Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import StatusIndicator from "../components/StatusIndicator";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";

const System = ()=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    // Network
    const[ ssid, setSsid ] = useState<string>('');
    const[ ipAddress, setIpAddress ] = useState<string>('');

    // System application info
    const[ appVersion, setAppVersion ] = useState<string>('');
    const[ cpuUsage, setCpuUsage ] = useState<string>('');
    const[ memUsage, setMemUsage ] = useState<string>('');
    const[ appStatus, setAppStatus ] = useState<string>('');

    useEffect(()=>{
        getNetworkSettings();
        getSystemApplicationInfo();
    },[]);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Get the network settings
    async function getNetworkSettings(){
        const result = await api_system_getNetworkSettings();
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
        }
        if( typeof(result.ssid) === 'string' ) setSsid(result.ssid);
        if( typeof(result.ipAddress ) === 'string' ) setIpAddress(result.ipAddress);
        return;
    }

    // Get the system application info
    async function getSystemApplicationInfo(){
        const result = await api_system_getApplicationInfo();
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
        }
        if( typeof(result.version) === 'string' ) setAppVersion(result.version);
        if( typeof(result.status) === 'string' ) setAppStatus(result.status);
        if( typeof(result.memUsage) === 'string' ) setMemUsage(result.memUsage);
        if( typeof(result.cpuUsage) === 'string' ) setCpuUsage(result.cpuUsage);
        return;
    }

    // Request system restart
    async function requestSystemRestart(){
        // Check if user is sure about this action
        if( !window.confirm("Restart system?") ) return;
        setDisabled(true);

        const result = await api_system_reboot();
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

        // Request system identification
    async function requestSystemIdentifycation(){
    
        const result = await api_system_identify();
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }
        return;
    }

    // Request system restart
    async function requestSystemSoftwareUpdate(){
        // Check if user is sure about this action
        if( !window.confirm("Update system software?") ) return;
        setDisabled(true);

        const result = await api_system_updateSystemSoftware();
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

    return(
        <Container>
            <div className="float-right">
                <Button variant={'danger'} className="mb-2" onClick={()=>{requestSystemRestart()}} disabled={disabled}><FontAwesomeIcon icon={faPowerOff}/> Restart</Button>&nbsp;
                <Button variant={'primary'} className="mb-2" onClick={()=>{requestSystemIdentifycation()}} disabled={disabled}><FontAwesomeIcon icon={faSmileBeam}/> Identify</Button>
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
            <StatusIndicator message={appStatus==='online'?'Running':appStatus} type={appStatus==='online'?'success':'danger'}/>
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
                <Form.Label column sm={2}>Application version</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Version'} value={appVersion} disabled/>
                </Col>
            </Form.Group>
            <NotificationBox message={message} isError={isError} />
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}></Form.Label>
                <Col sm={6}>
                    <Button variant={'danger'} onClick={()=>{requestSystemSoftwareUpdate()}} disabled={disabled}>Update</Button>
                </Col>
            </Form.Group>
        </Container>
    );
}

export default System;