/*
 *  Connectivity API
 */

/* Get Azure client status */
export async function api_connectivity_azure_getStatus(){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/status',{
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
export async function api_connectivity_azure_getConnectionParameters(){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/connectionparameters',{
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
export async function api_connectivity_azure_updateConnectionParameters( parameters:any ){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/connectionparameters',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify( parameters )
    });

    const content = await response.json();
    return content;
}

/* (Re)connect to Azure IoT Hub */
export async function api_connectivity_azure_connect(){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/connect',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    const content = await response.json();
    return content;
}

/* Get Azure Device Provisioning Service for IoT Hub parameters */
export async function api_connectivity_azure_getProvisioningParameters(){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/provisioningparameters',{
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
export async function api_connectivity_azure_updateProvisioningParameters( parameters:any ){
    console.log(parameters);
    const response = await fetch( window.location.origin+'/api/connectivity/azure/provisioningparameters',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify( parameters )
    });
    
    const content = await response.json();
    return content;
}

/* (Re)provision from Azure Device Provisioning Service for IoT Hub */
export async function api_connectivity_azure_provision(){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/provision',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });

    const content = await response.json();
    return content;
}