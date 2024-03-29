import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

const NotificationBox = ( props:{ message:string, isError?:boolean })=>{
    const[ message, setMessage ] = useState<string>('');

    return(<>
            {props.message?
                <Alert variant={props.isError?'danger':'success'}>
                    {props.message}
                </Alert>
            :<></>}
        </>);
}

export default NotificationBox;