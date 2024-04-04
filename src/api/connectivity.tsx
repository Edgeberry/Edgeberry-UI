/*
 *  Connectivity API
 */

/* Get Azure client status */
export async function api_connectivity_getStatus(){
    const response = await fetch( window.location.origin+'/api/connectivity/status',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err:any){
        return ({message:err.toString()});
    }
}

/* Get Azure IoT Hub connection parameters */
export async function api_connectivity_getConnectionParameters(){
    const response = await fetch( window.location.origin+'/api/connectivity/connectionparameters',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err:any){
        return ({message:err.toString()});
    }
}

/* Update Azure IoT Hub connection parameters */
export async function api_connectivity_updateConnectionParameters( parameters:any ){
    const response = await fetch( window.location.origin+'/api/connectivity/connectionparameters',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify( parameters )
    });

    const content = await response.json();
    return content;
}

/* (Re)connect to Azure IoT Hub */
export async function api_connectivity_connect(){
    const response = await fetch( window.location.origin+'/api/connectivity/connect',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    
    let content = await response.json();
    content.ok = response.ok
    return content;
}

/* Get Azure Device Provisioning Service for IoT Hub parameters */
export async function api_connectivity_getProvisioningParameters(){
    const response = await fetch( window.location.origin+'/api/connectivity/provisioningparameters',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json()
        return content;
    } catch(err:any){
        return ({message:err.toString()});
    }
}



/* Update Azure Device Provisioning Service for IoT Hub parameters */
export async function api_connectivity_updateProvisioningParameters( parameters:any ){
    console.log(parameters);
    const response = await fetch( window.location.origin+'/api/connectivity/provisioningparameters',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify( parameters )
    });
    
    const content = await response.json();
    return content;
}

/* (Re)provision from Azure Device Provisioning Service for IoT Hub */
export async function api_connectivity_provision(){
    const response = await fetch( window.location.origin+'/api/connectivity/provision',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    let content = await response.json();
    content.ok = response.ok;
    return content;
}

/* Send Message to Azure IoT Hub */
export async function api_connectivity_sendMessage( message:string, properties:any[]){
    const response = await fetch( window.location.origin+'/api/connectivity/sendmessage',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            message: message,
            properties: properties
        })
    });

    let content = await response.json();
    content.ok = response.ok;
    return content;
}