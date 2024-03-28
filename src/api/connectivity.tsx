/*
 *  Connectivity API
 */

/* Get Azure IoT Hub connection parameters */
export async function api_connectivity_azure_getConnectionParameters(){
    const response = await fetch( window.location.origin+'/api/connectivity/azure/connectionparameters',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
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
    const content = await response.json();
    return content;
}