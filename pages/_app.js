import React, { createContext, useState } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { PlayerContextProvider } from '@cassette/core'
import { MediaPlayerControls } from '@cassette/player'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/react-hooks'

import '@cassette/player/dist/css/cassette-player.css'

import theme from '../src/theme' 
import withData from '../util/apollo-client' 

export const AppContext = createContext()
const AppContextProvider = (props) => {
  const [ playlist, setPlaylist ] = useState([])

  return (    
    <AppContext.Provider value={{ playlist, setPlaylist }}>
      {props.children}
    </AppContext.Provider> 
  )
}  

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'radial-gradient(ellipse at center, #070F26 0%, #070F26 30%, rgb(0, 0, 0) 100%)',
    color: '#ffffff'
  },
}))

function ButtonAppBar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

function MyApp(props) {
  const { Component, pageProps, apollo } = props
  const classes = useStyles()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')

    if (jssStyles) 
      jssStyles.parentElement.removeChild(jssStyles)
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <AppContextProvider>
        <AppContext.Consumer>
          {({ playlist }) => (
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <ApolloProvider client={apollo}>
                <PlayerContextProvider playlist={playlist}>
                  <CssBaseline />
                  <Box
                    height="100vh"
                    classes={classes} 
                  >
                    <Component {...pageProps} />
                  </Box>
                </PlayerContextProvider>
              </ApolloProvider>
            </ThemeProvider>
          )}
        </AppContext.Consumer>
      </AppContextProvider>
    </React.Fragment>
  )
}
//
// <ButtonAppBar/>
// <MediaPlayerControls controls={[ 'spacer', 'playpause', 'mute', 'spacer', 'progress' ]} />

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default withData(MyApp)
