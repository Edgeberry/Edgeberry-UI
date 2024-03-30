import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { api_connectivity_azure_getProvisioningParameters, api_connectivity_azure_provision, api_connectivity_azure_updateProvisioningParameters } from "../api/connectivity";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import CertificateControl from "./CertificateControl";

const AzureDeviceProvisioningService = ( props:{authenticationType:string, setAuthenticationType?:Function, disabled?:boolean } )=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);

    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    const[ hostname, setHostname ] = useState<string>('');
    const[ idScope, setIdScope ] = useState<string>('');
    const[ regId, setRegId ] = useState<string>('');
    // Symmetric Key
    const[ regKey, setRegKey ] = useState<string>(''); 
    // X.509 Certificates
    const[ cert, setCert ] = useState<string>('');
    const[ pkey, setPKey ] = useState<string>('');

    useEffect(()=>{
        if(typeof(props.disabled) !== 'undefined') setDisabled(props.disabled);
    },[props.disabled]);

    useEffect(()=>{
        getProvisioningParameters();
    },[]);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Get Azure Provisioning parameters
    async function getProvisioningParameters(){
        const result = await api_connectivity_azure_getProvisioningParameters();
        console.log(result);
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
        }
        // Set the parameters in the fields
        if( typeof(result.hostName) === 'string' ) setHostname(result.hostName);
        if( typeof(result.idScope) === 'string' ) setIdScope(result.idScope);
        if( typeof(result.registrationId) === 'string' ) setRegId(result.registrationId);
        if( typeof(result.registrationKey) === 'string' ) setRegKey(result.registrationKey);
        if( typeof(result.certificate) === 'string' ) setCert(result.certificate);
        if( typeof(result.privateKey) === 'string' ) setPKey(result.privateKey);
        // Update the authenticationType
        if( typeof(props.setAuthenticationType) === 'function' && typeof(result.authenticationType) === 'string')
        props.setAuthenticationType( result. authenticationType );
    }

    // Update Azure provisioning parameters
    async function updateProvisioningParameters(){
        // Feedback for the user
        setIsError(false);
        setMessage("Saving provisioning parameters...");
        setDisabled(true);

        const parameters = {
            hostName: hostname,
            idScope: idScope,
            registrationId: regId,
            authenticationType: props.authenticationType,
            registrationKey: regKey,
            certificate: cert,
            privateKey: pkey,
        }
        const result = await api_connectivity_azure_updateProvisioningParameters( parameters );
        if( result.message ){
            setIsError(false);
            setMessage(result.message);
        }
    }

    // (Re)provision the device
    async function provision(){
        // First save the provisioning parameters
        await updateProvisioningParameters();

        // Feedback for the user
        setIsError(false);
        setMessage("Provisioning device...");
        setDisabled(true);

        // Request reprovisioning
        const result = await api_connectivity_azure_provision();
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }

        setDisabled(false);
    }
    
    return(
        <>
            <Form>
                <div className="float-right">
                    <Button variant={'danger'} onClick={()=>{provision()}}  className="mb-2" disabled={disabled}><FontAwesomeIcon icon={faRetweet}/> Reprovision</Button>
                </div>
                <h3>Azure Device Provisioning Service</h3>
                <br/>
                {/*<Alert>
                    The Device Provisioning Service is a managed service to allow devices to be provisioned and configured in 
                    a secure and standardized manner to ensure that devices can securely connect to Azure IoT Hub for further 
                    management and communication.
                </Alert>*/}
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Hostname'} value={hostname} onChange={(e)=>{setHostname(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>ID scope</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'ID scope'} value={idScope} onChange={(e)=>{setIdScope(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Registration ID</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Registration ID'} value={regId} onChange={(e)=>{setRegId(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                {/* Conditionally: Symmetric Key */}
                {props.authenticationType === 'sas'?
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Registration Key</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'Registration key'} value={regKey} onChange={(e)=>{setRegKey(e.target.value)}} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                :<></>}
                {/* Conditionally: X.509 Certificates */}
                {props.authenticationType === 'x509'?<>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Certificate</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Certificate'} value={cert} onChange={(e:any)=>{setCert(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Private Key</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Private Key'} value={pkey} onChange={(e:any)=>{setPKey(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                </>:<></>}
                <NotificationBox message={message} isError={isError} />
            </Form>
            <br/>
        </>
    );
}

export default AzureDeviceProvisioningService;