import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import { AppProps } from 'next/app'
import { Config, DAppProvider, Goerli, Mainnet } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'


// TODO: Use your own provider (e.g.: allthatnode.com) so that we can get metrics, better speeds and other stuf
const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    // [Mainnet.chainId]: getDefaultProvider('mainnet'),
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DAppProvider config={config}>
        <Component {...pageProps} />
      </DAppProvider>
    </ChakraProvider>
  )
}

export default MyApp
