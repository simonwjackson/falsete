import React , { useMemo, useEffect, useState,useContext } from 'react'
import { AppContext } from '../../_app'
import { usePlayerContext } from '@cassette/hooks'
import { useRouter } from 'next/router'
import { pathOr } from 'ramda'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Head from 'next/head'
import { useLazyQuery , useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { MediaPlayerControls } from '@cassette/player'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const youtube2playlist = (list) => {
  return list.map(item => ({
    title: item.title,
    url: item.formats[0].url
  }))
}

const Home = () => {
  const router = useRouter() 
  const { setPlaylist } = useContext(AppContext)
  const { query } = router.query
  const {
    playlist, currentTime, paused, onTogglePause 
  } = usePlayerContext([
    'playlist', 'currentTime', 'paused', 'onTogglePause'
  ])

  const GOOGLED_ALBUM = gql`
    query googledAlbum($query: String!) {
      albumGoogler(query: $query) {
        youtube {
          id
          total_items
          items {
            url
            title
            formats(
              limit: 1
              type: "audio"
              sort: { field: "audioBitrate", order: DESC }
            ) {
              mimeType
              url
              audioBitrate
              audioQuality
              audioChannels
              approxDurationMs
              audioSampleRate
              bitrate
              container
            }
          }
        }
      }
    }
`
  const [loadGoogledAlbum, { error, called, loading, data: googledAlbum }] = useLazyQuery(
    GOOGLED_ALBUM,
    { variables: { query } }

  )

  useMemo(() => {
    if (query && !called) 
      loadGoogledAlbum()
    
    if (query && called && !error && !loading) {
      const list = pathOr([], ['albumGoogler','youtube', 0, 'items'], googledAlbum)
      console.log('hi')
      setPlaylist(youtube2playlist(list))
    }
  }, [setPlaylist, query, error, called, loading, googledAlbum])

  if (loading) 
    return <p>Loading...</p>

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }
  else {
  }

  // console.log(googledAlbum)

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <div>
          The track is {paused ? 'paused' : 'playing'}. The time is {currentTime}.
        </div>
        <button onClick={onTogglePause}>Toggle pause!</button> 
      </Box>
    </Container>
  )
}

export default Home

