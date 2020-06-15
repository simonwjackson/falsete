import React, { useMemo, useContext } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'
import { pathOr, find, path, pipe } from 'ramda'
import { AppContext } from '../../../../_app'
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
}))

const youtube2playlist = (list) => {
  return list.map(item => ({
    title: item.title,
    url: item.formats[0].url
  }))
}

/*
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="50vh"
        width={1}
        style={{
          backgroundImage: `url(${art})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        {paused ? (
          <PlayCircleFilled
            style={{ fontSize: '20vw' }}
            onClick={onTogglePause}
          />
        ) : (
          <PauseCircleFilled
            style={{ fontSize: '20vw' }}
            onClick={onTogglePause}
          />
        )}
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={1}
        style={{ maxHeight: '100%', overflow: 'auto' }}
      >
*/

const PlaylistView = ({ 
  activeTrackIndex, 
  onSelectTrackIndex, 
  onTogglePause, 
  list, 
  art, 
  paused 
}) => {
  return (
    <List dense>
      {list.map((item , i) => (
        <ListItem
          selected={activeTrackIndex === i}
          onClick={() => onSelectTrackIndex(i)}
          key={item.url}
        >
          <ListItemAvatar>      
            <ListItemText primary={i + 1} />
          </ListItemAvatar>
          <ListItemText primary={item.title} />
        </ListItem>
      ))} 
    </List> 
  )
}

const Youtube = () => {
  const router = useRouter() 
  const classes = useStyles() 
  const { setPlaylist } = useContext(AppContext)

  const { playlist: youtubePlaylistId } = router.query
  const {
    onSelectTrackIndex, activeTrackIndex, paused, onTogglePause 
  } = usePlayerContext([
    'onSelectTrackIndex', 'activeTrackIndex', 'paused', 'onTogglePause'
  ])

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

  const art = pipe(
    pathOr([], ['youtubePlaylist', 'items']),
    find(path(['thumbnail'])),
    pathOr('', ['thumbnail'])
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

  return <PlaylistView 
    art={art}
    list={list} 
    paused={paused}
    activeTrackIndex={activeTrackIndex}
    onTogglePause={onTogglePause}
    onSelectTrackIndex={onSelectTrackIndex}
  />
}

export default Youtube

