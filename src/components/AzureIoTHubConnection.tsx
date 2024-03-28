import { Button, Col, Form, Row } from "react-bootstrap";

const AzureIoTHubConnection = ()=>{
    return(
        <>
            <Form>
                <h3>Azure IoT Hub Connection</h3>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Hostname'} required />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Device ID</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Device Id'} required />
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

export default AzureIoTHubConnection;