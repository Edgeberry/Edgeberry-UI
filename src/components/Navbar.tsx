import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { api_system_getState } from "../api/system";
import StatusIndicator from "./StatusIndicator";

const NavigationBar = ()=>{
    const[ appState, setAppState ] = useState<string>('');
    const[ sysState, setSysState ] = useState<string>('');
    const[ conState, setConState ] = useState<string>('');

    useEffect(()=>{
        updateStateIndicators();
        setInterval(()=>{updateStateIndicators()}, 2000);
    },[]);

    async function updateStateIndicators(){
        const result = await api_system_getState();
        if( result.message ){
            return;
        }

        // Determine the Application state
        switch( result.application.connection ){
            case 'connected':     setAppState('success');
                                break;
            case 'started':     setAppState('success');
                                break;
            default:            setAppState('danger');
                                break;
        }

        // Determine the system state
        switch( result.system.state ){
            case 'running':     setSysState('success');
                                break;
            case 'started':     setSysState('success');
                                break;
            default:            setSysState('danger');
                                break;
        }

        // Determine the connection state
        if( result.connection.provisioned){
            // If the device is provisioned,
            // we check the connection status.
            switch( result.connection.connection ){
                case 'connected':   setConState('success');
                                    break;
                case 'connecting':  setConState('warning');
                                    break;
                default:            setConState('danger');
                                    break;
            }
        }
        else{
            // If the device is not provisioned,
            // we check the provisioning status
            switch( result.connection.provision ){
                case 'provisioned': setConState('success');
                                    break;
                case 'provisioning':setConState('warning');
                                    break;
                default:            setConState('danger');
                                    break;
            }
        }

    }

    return(
        <Navbar sticky="top" bg={'dark'} data-bs-theme={'dark'}>
            <Container>
                <Navbar.Brand href='/'>
                    <img src="logo_inverted.png" alt="Edge Gateway" height={'30px'}/>&nbsp;
                    Edge Gateway
                </Navbar.Brand>
                <Nav>
                    <Nav.Link href='/application'>
                        <StatusIndicator message={appState} type={appState} noText/>Application 
                    </Nav.Link>
                    <Nav.Link href='/connectivity'>
                        <StatusIndicator message={conState} type={conState} noText/>Connectivity 
                    </Nav.Link>
                    <Nav.Link href='/system'>
                        <StatusIndicator message={sysState} type={sysState} noText/>System 
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;