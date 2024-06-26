/*
 *  System REST API
 */

/* Network */

/* Get network settings */
export async function api_system_getNetworkSettings(){
    const response = await fetch( window.location.origin+'/api/system/network/settings',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err:any){
        return {message:err.toString()};
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
    } catch(err:any){
        return {message:err.toString()};
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
    } catch(err:any){
        return {message:err.toString()};
    }
}


/* Get system info */
export async function api_system_getSystemInfo(){
    const response = await fetch( window.location.origin+'/api/system/info',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err:any){
        return {message:err.toString()};
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
        let content = await response.json();
        content.ok = response.ok;
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}

/* Identify the system */
export async function api_system_identify(){
    const response = await fetch( window.location.origin+'/api/system/identify',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        let content = await response.json();
        content.ok = response.ok;
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}

/*  Get the device state */
export async function api_system_getState(){
    const response = await fetch( window.location.origin+'/api/system/state',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}