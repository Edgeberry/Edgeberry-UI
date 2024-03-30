import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { api_connectivity_azure_sendMessage } from "../api/connectivity";

const SendMessageModal = ( props:{ show:boolean, onClose:Function })=>{
    // Message body
    const[ body, setBody ] = useState<string>('');
    // Message properties
    const[ properties, setProperties ] = useState<JSX.Element[]>([]);
    const[ propertyList, setPropertyList ] = useState<Object[]>([]);
    // User feedback
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ disabled, setDisabled ] = useState<boolean>(false);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Send the message
    async function sendMessage(){
        setDisabled(true);
        setIsError(false);
        setMessage("Sending message...");

        // Remove the ID from each property
        let properties = propertyList.map( (property:any)=>{
            return (({id, ...o})=>o)(property);
        });

        const result = await api_connectivity_azure_sendMessage( message, properties );
        if( !result.ok ){
            setDisabled(false);
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setDisabled(false);
            setIsError(false);
            setMessage(result.message);
        }
    }

    // Create a new property
    function newProperty(){
        const property = { key:'', value: '', id:'property-'+Math.floor(Math.random()*1000)};
        setPropertyList(propertyList =>[...propertyList, property]);
    }

    // Remove a property by ID
    function removePropertyById( id:string ){
        console.log('deleting: '+id)
        let properties = [...propertyList];
        properties.splice( properties.findIndex((property:any)=>{return property.id === id}),1);
        setPropertyList([...properties]);
    }

    // Update a property in the list
    function updatePropertyById(id:string, key:string, value:string){
        setPropertyList([...
            propertyList.map( (property:any)=>{
                if(property.id === id ) return {...property, key:key, value:value };
                return property;
            })]
        );
    }


    /* Visualisation of the properties */
    // Whenever the list of properties changes, update the visual
    // representation
    useEffect(()=>{
        populatePropertyElements();
        console.log(propertyList);
    },[propertyList])

    // Visualize the list of properties
    function populatePropertyElements(){
        setProperties([]);
        propertyList.forEach( (property:any) =>{
            setProperties( properties =>[...properties, <MessageProperty property={property}
                                                                         onDelete={removePropertyById}
                                                                         onChange={updatePropertyById}
                                                                         key={property.id}
                                                        />]);
        });
    }

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
                    {properties}
                    <Button onClick={()=>{newProperty()}}>New Property</Button>
                    <NotificationBox message={message} isError={isError} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'danger'} onClick={()=>{sendMessage()}}>Send message</Button>
                </Modal.Footer>
            </Modal>
        </>);
}

export default SendMessageModal;

const MessageProperty = ( props:{ property:any, onDelete:Function, onChange:Function })=>{
    const[ key, setKey ] = useState<string>('');
    const[ value, setValue ] = useState<string>('');

    useEffect(()=>{
        props.onChange( props.property.id, key, value );
    },[key,value]);

    return(
            <Form.Group as={Row} className="mb-2">
                <Col sm={1}>
                    <Button variant={'danger'} onClick={()=>{props.onDelete(props.property.id)}}><FontAwesomeIcon icon={faTrash}/></Button>
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