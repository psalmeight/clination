import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import Routes from 'routes'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import registerServiceWorker from 'utils/registerServiceWorker'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3'
    }
  }
})

render(
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <MuiThemeProvider theme={theme}>
        <Provider store={configureStore()}>
          <Routes />
        </Provider>
      </MuiThemeProvider>
    </MuiPickersUtilsProvider>,
  document.getElementById('root')
)

registerServiceWorker()
