import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const AzureDeviceProvisioningService = ( props:{authenticationType:string, disabled?:boolean } )=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);

    useEffect(()=>{
        if(typeof(props.disabled) !== 'undefined') setDisabled(props.disabled);
    },[props.disabled]);
    
    return(
        <>
            <Form>
                <div className="float-right">
                    <Button variant={'danger'} disabled={disabled}>Reprovision</Button>
                </div>
                <h3>Azure Device Provisioning Service</h3>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Hostname'} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>ID scope</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'ID scope'} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Registration ID</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Registration ID'} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                {/* Conditionally: Shared Access Key */}
                {props.authenticationType === 'sas'?
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Shared Access Key</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'Shared Access Key'} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                :<></>}
                {/* Conditionally: X.509 Certificates */}
                {props.authenticationType === 'x509'?<>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Certificate</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'Certificate'} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Private Key</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'Private Key'} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                </>:<></>}
                <Button variant={'primary'} disabled={disabled}>Save</Button>&nbsp;
                <Button variant={'danger'} disabled={disabled}>Reset</Button>
            </Form>
        </>
    );
}

export default AzureDeviceProvisioningService;