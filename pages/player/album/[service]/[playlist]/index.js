import React, { useMemo, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Paper } from '@material-ui/core'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'
import { take, divide, add, map, sum, pathOr, find, path, pipe } from 'ramda'
import { usePlayerContext } from '@cassette/hooks'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import { useLazyQuery , useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import AlbumView from '../../../../../components/AlbumView/AlbumView'
import { AppContext } from '../../../../_app'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    height: '2px'
  }
}))

const youtube2playlist = (list) => {
  return list.map(item => ({
    title: item.title,
    url: item.formats[0].url
  }))
}

const Album = () => { 
  const router = useRouter() 
  const classes = useStyles() 
  const { setPlaylist } = useContext(AppContext)

  const { playlist: youtubePlaylistId, artist, release, title, art } = router.query
  const {
    onSelectTrackIndex, activeTrackIndex, paused, onTogglePause, currentTime
  } = usePlayerContext([
    'onSelectTrackIndex', 'activeTrackIndex', 'paused', 'onTogglePause', 'currentTime'
  ])

  const togglePause = () => {
    return activeTrackIndex >= 0
      ? onTogglePause()
      : onSelectTrackIndex(0) 
  }

  const YOUTUBE_PLAYLIST = gql`
    query youtubePlaylist($id: ID!) {
      youtubePlaylist(id: $id) {
        id
        total_items
        items {
          thumbnail
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
  `

  const [loadYoutubePlaylist, { error, called, loading, data: youtubePlaylist }] = useLazyQuery(
    YOUTUBE_PLAYLIST,
    { variables: { id: youtubePlaylistId } }
  )

  const currentAlbumTime = pipe(
    pathOr([], ['youtubePlaylist', 'items']), 
    take(activeTrackIndex),
    map(path(['formats', 'approxDurationMs'])),
    map(Number),
    sum,
    add(currentTime * 1000)
  )(youtubePlaylist)

  const totalTime = pipe(
    pathOr([], ['youtubePlaylist', 'items']), 
    map(path(['formats', 0, 'approxDurationMs'])),
    map(Number),
    sum,
  )(youtubePlaylist)

  useMemo(() => {
    if (youtubePlaylistId && !called) 
      loadYoutubePlaylist()
    
    if (youtubePlaylistId && called && !error && !loading) 
      pipe(
        pathOr([], ['youtubePlaylist', 'items']),
        youtube2playlist,
        setPlaylist
      )(youtubePlaylist)
  }, [setPlaylist, youtubePlaylistId, error, called, loading, youtubePlaylist])

  if (loading) 
    return <p>Loading...</p>

  if (error) 
    return <p>Error: {JSON.stringify(error)}</p>

  const list = pathOr([], ['youtubePlaylist', 'items'], youtubePlaylist)

  console.log (
    currentTime,
    currentAlbumTime, 
    totalTime,
    currentAlbumTime / totalTime * 100
  )

  return <AlbumView 
    onTogglePause={togglePause}
    title={title}
    artist={artist}
    release={release}
    progress={currentAlbumTime}
    playtime={totalTime}
    paused={paused}
    art={art}
  /> 
}

export default Album

