import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const StatusIndicator = ( props:{ message:string, type?:string })=>{
    const[ color, setColor ] = useState<string>('#28a745');

    useEffect(()=>{
        switch(props.type){
            case 'danger':  setColor('#dc3545');
                            break;
            case 'warning': setColor('#ffc107');
                            break;
            default:        setColor('#28a745');
                            break;
        }
    },[props.type]);

    return(<>
            {props.message?
                <p style={{fontWeight:'bold', color:`${color}`}}><FontAwesomeIcon icon={faCircle}/> {props.message}</p>
            :<></>}
        </>);
}

export default StatusIndicator;