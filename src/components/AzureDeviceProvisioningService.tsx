import { Button, Col, Form, Row } from "react-bootstrap";

const AzureDeviceProvisioningService = ()=>{
    return(
        <>
            <Form>
                <h3>Azure Device Provisioning Service</h3>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Hostname'} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>ID scope</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'ID scope'} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Registration ID</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Registration ID'} required />
                    </Col>
                </Form.Group>
                {/* Conditionally: Shared Access Key */}
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Shared Access Key</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Shared Access Key'} required />
                    </Col>
                </Form.Group>
                <Button variant={'primary'}>Save</Button>&nbsp;
                <Button variant={'danger'}>Reset</Button>
            </Form>
        </>
    );
}

export default AzureDeviceProvisioningService;