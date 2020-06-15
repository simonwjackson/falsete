import React, { useMemo, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Paper } from '@material-ui/core'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'
import { pathOr, find, path, pipe } from 'ramda'
import { AppContext } from '../../_app'
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

const FullAlbumView = ({ 
  progress,
  playtime,
  release,
  title,
  artist,
}) => {
  const classes = useStyles()
  const progessBar = progress / playtime * 100

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={1}
      >
        <img
          style={{ 
            objectFit: 'cover',
            width: '100%',
            objectPosition: 'center',
          }}
          src='https://fakealbumcovers.com/images/FakeAlbums/FozzieBear_BadBlood.png'
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="top"
        alignItems="center"
        width={1}
      >
        <Box
          width={1}
        >
          <LinearProgress classes={{
            root: classes.progress
          }}
          variant="determinate" value={progessBar} color="secondary" />
        </Box>
        <Box
          width={1}
          px={2}
          py={1}
        >
          <Grid container spacing={3}>
            <Grid item p={10}>{progress}m</Grid>
            <Grid item 
              style={{
                flexGrow: 1,
                textAlign: 'center'
              }}>{title}</Grid>
            <Grid item>{playtime}m</Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item 
              style={{
                flexGrow: 1,
                textAlign: 'center'
              }}>{release}</Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default FullAlbumView

