import { Alert } from "react-bootstrap";

const StatusIndicator = ( props:{ message:string, type?:string })=>{
    return(<>
            {props.message?
                <Alert variant={props.type?props.type:'success'}>
                    {props.message}
                </Alert>
            :<></>}
        </>);
}

export default StatusIndicator;