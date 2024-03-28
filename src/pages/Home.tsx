import { Alert, Container, Tab, Tabs } from "react-bootstrap";

const Home = ()=>{
    return(
        <Container>
            <h1>Edge Gateway UI</h1>
            <Tabs>
                <Tab eventKey="connectivityTab" title={'Connectivity'}>
                    <Alert>Here comes everything related to connectivity with the cloud</Alert>
                </Tab>
                <Tab eventKey="applicationTab" title={'Application'}>
                    <Alert>Here comes everything related to the device application</Alert>
                </Tab>
                <Tab eventKey="systemTab" title={'System'}>
                    <Alert>Here comes everything related to the device's system</Alert>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Home;