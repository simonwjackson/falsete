import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'
import { usePlayerContext } from '@cassette/hooks'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import { useLazyQuery , useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    height: '2px'
  }
}))

const AlbumView = ({ 
  progress,
  playtime,
  release,
  title,
  artist,
  onTogglePause,
  art,
  paused
}) => {
  const classes = useStyles()
  const progessBar = progress / playtime * 100

  return (
    <Grid 
      direction='column'
      container 
      style={{
        height:'100%',
      }}
    >
      <Grid item>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width={1}
          py={5}
        >
          <img
            style={{ 
              objectFit: 'cover',
              width: '75%',
              objectPosition: 'center',
            }}
            src={art}
          />
        </Box>
      </Grid>
      <Grid 
        container 
        direction="column"
        spacing={3} 
        style={{
          margin: 0,
          width: '100%',
        }}
      >
        <Grid item
          style={{
            flexGrow: 1,
            textAlign: 'center'
          }}>{artist}</Grid>
        <Grid item 
          style={{
            flexGrow: 1,
            textAlign: 'center'
          }}>

          <Box
            margin={'auto'}
            width={.5}
          >
            <LinearProgress 
              classes={{
                root: classes.progress
              }}
              variant="determinate"
              value={progessBar} 
              color="secondary"
            />
          </Box>
        </Grid>
        <Grid item 
          style={{
            flexGrow: 1,
            textAlign: 'center'
          }}>{title}</Grid>
        <Grid item 
          style={{
            flexGrow: 1,
            textAlign: 'center'
          }}>{release}</Grid>
      </Grid>
      <Grid
        item
        style={{
          flexGrow: 1,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center'
        }}
      > 
        {!paused && (
          <PauseCircleFilled
            onClick={onTogglePause}
            style={{ 
              color: 'rgba(255,255,255,.5)',
              fontSize: '20vw' 
            }} 
          /> )}

        {paused && ( 
          <PlayCircleFilled
            onClick={onTogglePause}
            style={{ 
              color: 'rgba(255,255,255,.5)',
              fontSize: '20vw' 
            }} 
          /> 
        )}
      </Grid>
    </Grid>
  )
}

export default AlbumView

