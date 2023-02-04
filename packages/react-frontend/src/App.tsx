import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/nav/Nav';
import { Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import NewMerkle from './components/views/NewMerkle';

function App() {
    return (
        <div className="App">
            <Nav />
            <Tabs align='center'>
                <TabList>
                    <Tab>Merklers</Tab>
                    <Tab>New</Tab>
                    <Tab>Snatch</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            <NewMerkle />
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
