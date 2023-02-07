import {
  Link as ChakraLink,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Container,
} from '@chakra-ui/react'
import { Footer } from '../components/Footer'
import Nav from '../components/Nav'
import NewMerkle from '../views/NewMerkle'

const Index = () => (
  <>
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
    {/* <DarkModeSwitch /> */}
    <Footer justifyContent='center'>
        <Text>Next ❤️ Chakra</Text>
    </Footer>
  </>
)

export default Index
