import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { api_connectivity_connect, api_connectivity_getConnectionParameters, api_connectivity_updateConnectionParameters } from "../api/connectivity";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import CertificateControl from "./CertificateControl";

const AWSIoTCoreConnection = ( props:{authenticationType:string, setAuthenticationType?:Function, disabled?:boolean } )=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    // Azure IoT Hub connection parameters
    const[ hostname, setHostname ] = useState<string>('');
    const[ deviceId, setDeviceId ] = useState<string>('');
    // Symmetric Key
    const[ sharedKey, setSharedKey ] = useState<string>('');
    // X.509 Certificate
    const[ cert, setCert ] = useState<string>('');
    const[ pKey, setPKey ] = useState<string>('');
    const[ rootca, setRootca ] = useState<string>('');

    useEffect(()=>{
        if(typeof(props.disabled) !== 'undefined') setDisabled(props.disabled);
    },[props.disabled]);

    useEffect(()=>{
        getConnectionParameters();
    },[]);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Get Azure IoT Hub connection parameters
    async function getConnectionParameters(){
        const result = await api_connectivity_getConnectionParameters();
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
        }
        // Set the parameters in the fields
        if( typeof(result.hostName) === 'string' ) setHostname(result.hostName);
        if( typeof(result.deviceId) === 'string' ) setDeviceId(result.deviceId);
        if( typeof(result.sharedAccessKey) === 'string' ) setSharedKey(result.sharedAccessKey);
        if( typeof(result.certificate) === 'string' ) setCert(result.certificate);
        if( typeof(result.privateKey) === 'string' ) setPKey(result.privateKey);
        if( typeof(result.rootCertificate) === 'string' ) setRootca(result.rootCertificate);
        // Update the authenticationType
        if( typeof(props.setAuthenticationType) === 'function' && typeof(result.authenticationType) === 'string')
        props.setAuthenticationType( result. authenticationType );
    }

    // Update Azure connection parameters
    async function updateConnectionParameters(){
        const parameters = {
            hostName: hostname,
            deviceId: deviceId,
            authenticationType: props.authenticationType,
            sharedAccessKey: sharedKey,
            certificate: cert,
            privateKey: pKey,
            rootCertificate: rootca
        }
        const result = await api_connectivity_updateConnectionParameters( parameters );
        setIsError(false);
        setMessage(result.message);
    }

    // (Re)connect the device
    async function connect(){
        // Update connection parameters
        await updateConnectionParameters();

        setIsError(false);
        setMessage('Reconnecting to Azure IoT Hub...');

        // Reconnect to Azure IoT Hub
        const result = await api_connectivity_connect();
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }
    
    }
    
    return(
        <>
            <Form>
                <div className="float-right">
                    <Button variant={'primary'} onClick={()=>{connect()}} className="mb-2" ><FontAwesomeIcon icon={faRetweet}/> Reconnect</Button>
                </div>
                <h3>AWS IoT Core Connection</h3>
                <br/>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Hostname'} value={hostname} onChange={(e)=>{setHostname(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Device ID</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Device ID'} value={deviceId} onChange={(e)=>{setDeviceId(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Certificate</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Certificate'} value={cert} onChange={(e:any)=>{setCert(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Private key</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Private Key'} value={pKey} onChange={(e:any)=>{setPKey(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Root certificate</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Root Certificate'} value={rootca} onChange={(e:any)=>{setRootca(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                <NotificationBox message={message} isError={isError} />
            </Form>
        </>
    );
}

export default AWSIoTCoreConnection;