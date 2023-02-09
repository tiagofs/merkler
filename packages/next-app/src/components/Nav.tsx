import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Text,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { Goerli, useEtherBalance, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';


export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { account, deactivate, activateBrowserWallet } = useEthers()
  const etherBalance = useEtherBalance(account)

  const [activateError, setActivateError] = React.useState('')
  const { switchNetwork, chainId } = useEthers()


  const activate = async () => {
    setActivateError('')
    activateBrowserWallet()
  }

  const getElipsedAddress = (string) => {
    return string.substring(0, 5) + '...' + string.substring(string.length - 4, string.length);
  }


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Logo</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {account ? (
                <Center>
                  <Stack marginTop='unset' marginX='20px' lineHeight='16px'>
                    <Text>{getElipsedAddress(account)}</Text>
                    {etherBalance && (
                      <Stack direction='row' align='center'>
                        Balance:
                        <p className="bold">{parseFloat(ethers.utils.formatEther(etherBalance)).toFixed(4)} eth</p>
                      </Stack>
                    )}
                  </Stack>
                  {(chainId !== Goerli.chainId) &&
                    <Button marginRight='20px' colorScheme='yellow' onClick={() => switchNetwork(Goerli.chainId)} leftIcon={<WarningTwoIcon />} >Change to Goerli</Button>
                  }
                  <Button onClick={() => deactivate()}>Disconnect</Button>
                </Center>
              ) : (
                <Button onClick={activate}>Connect</Button>
              )}
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}