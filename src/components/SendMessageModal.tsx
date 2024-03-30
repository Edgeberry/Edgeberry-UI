import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import NotificationBox from "./Notification";

const SendMessageModal = ( props:{ show:boolean, onClose:Function })=>{
    // Message body
    const[ body, setBody ] = useState<string>('');
    // Message properties
    const[ properties, setProperties ] = useState<JSX.Element[]>([]);
    const[ propertyList, setPropertyList ] = useState<Object[]>([]);
    // User feedback
    const[ message, setMessage ] = useState<string>('Zeemeermin');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ disabled, setDisabled ] = useState<boolean>(false);

    return(<>
            <Modal size={'lg'} onHide={()=>{props.onClose()}} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Message body</Form.Label>
                            <Form.Control as={'textarea'} rows={4} placeholder={'Message body'} value={body} onChange={(e)=>{setBody(e.target.value)}} disabled={disabled}/>
                        </Form.Group>
                    </Form>
                    <br/>
                    <p>Properties</p>
                    <MessageProperty />
                    <MessageProperty />
                    <MessageProperty />
                    <NotificationBox message={message} isError={isError} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'danger'}>Send message</Button>
                </Modal.Footer>
            </Modal>
        </>);
}

export default SendMessageModal;

const MessageProperty = ()=>{
    const[ key, setKey ] = useState<string>('');
    const[ value, setValue ] = useState<string>('');



    return(
            <Form.Group as={Row}>
                <Col sm={1}>
                    <Button variant={'danger'} onClick={()=>{}}>X</Button>
                </Col>
                <Col sm={5}>
                    <Form.Control type={'text'} placeholder={'Key'} value={key} onChange={(e)=>{setKey(e.target.value)}}/>
                </Col>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Value'} value={value} onChange={(e)=>{setValue(e.target.value)}}/>
                </Col>
            </Form.Group>
    );
}