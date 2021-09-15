import 'inter-ui'
import '@reach/dialog/styles.css'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import React, { StrictMode } from 'react'
// import { isMobile } from 'react-device-detect'
import ReactDOM from 'react-dom'
// import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { NetworkContextName } from './constants/misc'
import { LanguageProvider } from './i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './pages/App'
import store from './state'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import ThemeProvider, { ThemedGlobalStyle } from './theme'
import getLibrary from './utils/getLibrary'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LanguageProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Web3ProviderNetwork getLibrary={getLibrary}>
              <ThemeProvider>
                <ThemedGlobalStyle />
                <App />
              </ThemeProvider>
            </Web3ProviderNetwork>
          </Web3ReactProvider>
        </LanguageProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

serviceWorkerRegistration.unregister()
