import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import Routes from 'routes'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import registerServiceWorker from 'utils/registerServiceWorker'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    }
  }
})

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={configureStore()}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

registerServiceWorker()
