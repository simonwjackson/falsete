import React, { useMemo, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Paper } from '@material-ui/core'
import { PauseCircleFilled, PlayCircleFilled } from '@material-ui/icons'
import { take, divide, add, map, uncurryN, sum, pathOr, find, path } from 'ramda'
import { usePlayerContext } from '@cassette/hooks'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import { useLazyQuery , useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import AlbumView from '../../../../../components/AlbumView/AlbumView'
import { AppContext } from '../../../../_app'

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  progress: {
    height: '2px'
  }
}))

const youtube2playlist = map(item => ({
	title: item.title,
	url: item.formats[0].url
})) 

const getCurrentAlbumTime = uncurryN(3, playlist => active => time =>
	playlist
		|> pathOr([], ['youtubePlaylist', 'items'], #)
		|> take(active, #)
		|> map(path(['formats', 'approxDurationMs']), #)
		|> map(Number, #)
		|> sum(#)
		|> add(time * 1000, #)
)

const getTotalTime = playlist =>
	playlist 
		|> pathOr([], ['youtubePlaylist', 'items'], #)
		|> map(path(['formats', 0, 'approxDurationMs']), #)
		|> map(Number,  #)
		|> sum(#) 

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

  const [loadYoutubePlaylist, { error, called, loading, data: youtubePlaylist }] = useLazyQuery(
    YOUTUBE_PLAYLIST,
    { variables: { id: youtubePlaylistId } }
  )

  useMemo(() => {
    if (youtubePlaylistId && !called) 
      loadYoutubePlaylist()
    
    if (youtubePlaylistId && called && !error && !loading) {
      youtubePlaylist
        |> pathOr([], ['youtubePlaylist', 'items'], #)
        |> youtube2playlist(#)
        |> setPlaylist(#)
    }
  }, [setPlaylist, youtubePlaylistId, error, called, loading, youtubePlaylist])

  // if (loading)
  //   return <p>Loading...</p>

  if (error) 
    return <p>Error: {JSON.stringify(error)}</p>

  const list = pathOr([], ['youtubePlaylist', 'items'], youtubePlaylist)
	const progress = getCurrentAlbumTime(youtubePlaylist, activeTrackIndex, currentTime)
	const playtime = getTotalTime(youtubePlaylist)

  return <AlbumView {...{
			onTogglePause: togglePause,
			title,
			artist,
			release,
			progress,
			playtime,
			paused,
			art
		}}
  /> 
}

export default Album

