import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    // primary: {
    //   main: '#ffffff',
    // },
    // secondary: {
    //   main: '#ffffff',
    //   // main: 'rgba(255, 255, 255, 0.1)',
    // },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Open Sans Condensed',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
})

export default theme
