/*
 *  System REST API
 */

/* Network */

/* Get Azure Device Provisioning Service for IoT Hub parameters */
export async function api_system_getNetworkSettings(){
    const response = await fetch( window.location.origin+'/api/system/network/settings',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err){
        return {message:err};
    }
}

/* System */

/* Get system application info */
export async function api_system_getApplicationInfo(){
    const response = await fetch( window.location.origin+'/api/system/application/info',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err){
        return {message:err};
    }
}

/* Update the system application */
export async function api_system_updateSystemSoftware(){
    const response = await fetch( window.location.origin+'/api/system/application/update',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        let content = await response.json();
        content.ok = response.ok;
        return content;
    } catch(err){
        return {message:err};
    }
}

/* Reboot the system */
export async function api_system_reboot(){
    const response = await fetch( window.location.origin+'/api/system/reboot',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err){
        return {message:err};
    }
}