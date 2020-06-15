import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from 'next/link'
import { useQuery , useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const albumList = [
  {
    service: 'youtube',
    id: 'OLAK5uy_k5S7aEvKcTkQClv8YJEdIMTOcjwmwsFTA',
    artist: 'Planes Mistaken for Stars',
    title: 'Mercy',
    release: 2006,
    art: 'https://lh3.googleusercontent.com/JCCBzXRGiUyBi89CYd_miO9jgABO98vtokMjBXgydmf1DWKr06fthdqvVepd5Q8XAYYwawRYPw=s1024-c-e100-v1'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_mz-Ny8ExSQg1MHmn6jpGDgZUkis3rEvko',
    artist: 'Planes Mistaken For Stars',
    title: 'Up in Them Guts',
    release: 2004,
    art: 'https://lh3.googleusercontent.com/hbhJ01MTA8M6OIr6lLoapRcgERLD2nyrqHkKLjPFaKybnYs0S1l7aS4WYxCCtGcFk-xj8UJ_xIgvXeFC=w544-h544-l90-rj'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_kOha-DEe4sK-nqpFPxnNe_1XTtpQU86HY',
    artist: 'Weatherbox',
    title: 'American Art',
    release: 2007,
    art: 'https://lh3.googleusercontent.com/TlHojFnJiT3ulMwO7d_uK-sdxluvI33KaOC_QzIbPZA8Ki0_qQH0A6j9Hqqp8W3YLijRaEWnyx8puMRs=w544-h544-l90-rj'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_lSeCtZplTdOI61l1HGZN7aDEbUxT71Zq8',
    artist: 'TTNG',
    title: 'Disappointment Island',
    release: 2016,
    art: 'https://i9.ytimg.com/s_p/OLAK5uy_lSeCtZplTdOI61l1HGZN7aDEbUxT71Zq8/sddefault.jpg?sqp=CMCmn_cFir7X7AMGCPSS59EF&rs=AOn4CLC-5SU278PtKVmnYA0pMEUHQYIY4A&v=1513736564'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_lPfibrbBDApPMk-j2iGnhJllCd7At8Ql8',
    artist: 'This Town Needs Guns',
    title: '13.0.0.0.0',
    release: 2013,
    art: 'https://lh3.googleusercontent.com/QTDOX05r_5FFSiam3p2rmlUzz4zz_vrAKTNvn62nXzfLA4Mqd_O6KmhlU54WGP0QRX-DLWV1wVpCv-iS=w544-h544-l90-rj'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_kEyq2X986ngHQMx6u-BZ3Qr3PBW5rAD50',
    artist: 'Sights & Sounds',
    title: 'Sights & Sounds',
    release: 0,
    art: 'https://lh4.ggpht.com/St71Z27YP83NCxNsHKRNmMY_7mKRy5ru4nplbJJVE0KT0C11OtB8TzyustB983LR9W0R4fE-2Q=s1024-c-e100-v1'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_kJE4SjPhqeMC-7Uf9ponaIfIneEFbrSJk',
    artist: 'Coaltar Of The Deepers',
    title: 'Come Over to the Deepend',
    release: 2000,
    art: 'https://lh3.googleusercontent.com/LggI1VKjeCPRGtfFawdsXKRSnXLonnsyq5OHB3WH_T5Ib9E-lcXKVXyPrDe6-bNK-8R-d2MsZKmgQjVD=w544-h544-l90-rj'
  }, 

  {
    service: 'youtube',
    id: 'MPREb_ya9p3sFGNxO',
    artist: 'Coaltar Of The Deepers',
    title: 'Yukari Telepath',
    release: 2007,
    art: 'https://lh3.googleusercontent.com/FS4k9CSEEHSdhZ3TaRtX0-W1ReZLZUDL69r4LMSwVFzE2ZkV6NlyzDoQmDkydgXzSLrBORCxWjSGv44=w544-h544-l90-rj'
  }, 

  {
    service: 'youtube',
    id: 'OLAK5uy_m6JCXNIfFxHHzcUTqNQMMxYa6eBDYlpUg',
    artist: 'Algernon Cadwallader',
    title: 'Some Kind of Cadwallader',
    release: 2008,
    art: 'https://lh3.googleusercontent.com/EipErwNssSb2kb1Ujyh6HId3abZS5PS9LmqZl4jqfjOXamT3Uz7LSlFP9xcQBGZsg7GlUcbWAU6swL7k=w544-h544-l90-rj'
  }, 

  {
    service: 'youtube',
    id: 'OLAK5uy_kSEDVdGyqKnHvZzZs7DaGzfd9J7-eXeU4',
    artist: 'American Football',
    title: 'American Football (LP3)',
    release: 2019,
    art: 'https://lh3.googleusercontent.com/YQSofv3qhgleIbul85tkvudJPNrp5nDzROZwOBr9iVI5wnhJZd73tMvcuaElFDE3fulwcIueTTPe_OVt=w544-h544-l90-rj'
  }, 

  {
    service: 'youtube',
    id: 'OLAK5uy_lFQnSpAHgECTEONczTT_1R4TMlCZzE7b0',
    artist: 'American Football',
    title: 'American Football (LP2)',
    release: 2016,
    art: 'https://lh3.ggpht.com/Lo4QoiVO8d1oasQQeIvKpqw70ja1jvu8HZBseGZ7jx0GW2oRVa01NyClN7LpKBwEb0OKilmBLA=s1024-c-e100-v1'
  }, 

  {
    service: 'youtube',
    id: 'OLAK5uy_ln-5QeH4YSPDXzUWkOQF5krJyQDDjtRRs',
    artist: 'American Football',
    title: 'American Football',
    release: 1999,
    art: 'https://lh3.ggpht.com/Lo4QoiVO8d1oasQQeIvKpqw70ja1jvu8HZBseGZ7jx0GW2oRVa01NyClN7LpKBwEb0OKilmBLA=s1024-c-e100-v1'
  }, 
  {
    service: 'youtube',
    id: 'OLAK5uy_n18qxpzaBeiW2YGgGHeDQ7BNrhcJQZ6ko',
    artist: 'Gravemind',
    release: 2101,
    title: 'Conduit',
    art: 'https://lh3.googleusercontent.com/lMm0Aa4D1joyOxoYM_s-TZNKbDbSgnTNYJ-5F6SM21M-B1eg6u4emQI4r3Fj0iFY2-qMb0h2G02ByVaz=w544-h544-l90-rj'
  },
]

const SimpleList = ({ list }) =>  {
  const classes = useStyles()

  return (
    <List>
      {list.map(item => ( 
        <Link 
          href={{ 
            pathname: '/player/album/[service]/[playlist]', 
            query: { ...item } 
          }} 
          as={`/player/album/${item.service}/${item.id}`}
        > 
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.title} src={item.art} />
            </ListItemAvatar>
            <ListItemText
              primary={item.title} 
              secondary={item.artist}
            />
          </ListItem> 
        </Link>
      ))}
    </List>
  )
}

const RELEASE_GROUP_QUERY = gql`
  {
    musicBrainzReleases(query: "13.0.0.0.0 This Town Needs Guns") {
      title
      id
      artists {
        id
        name
      }
    }
  }
`

// const UPDATE_TODO = gql`
//    mutation ModifyTask($uuid: ID!, $status: String) {
//       modifyTask(uuid: $uuid, status: $status) {
//         uuid
//         description
//         entry
//         modified
//         status
//         urgency
//       }
//     }
// `
//
// const sortDateAsc = (a,b) => (a.entry < b.entry) ? -1 : ((a.entry > b.entry) ? 1 : 0)

const Home = () => {
  // const { data: releasesQuery, loading, error } = useQuery(RELEASE_GROUP_QUERY)
  // const [ modifyTask ] = useMutation(UPDATE_TODO, {
  //   update(cache, { data }) {
  //     const { tasks } = cache.readQuery({ query: TASKS_QUERY })
  //
  //     cache.writeQuery({
  //       query: TASKS_QUERY,
  //       data: { tasks: tasks
  //         .filter(task => task.uuid !== data.modifyTask.uuid)
  //         .concat(data.modifyTask)
  //       },
  //     })
  //   }
  // })

  // if (loading)
  //   return <p>Loading...</p>

  // if (error)
  //   return <p>Error: {JSON.stringify(error)}</p>

  // <SimpleList list={releasesQuery.musicBrainzReleases} />

  return (
    <Container maxWidth="sm">
      <SimpleList list={albumList} />
    </Container>
  )
}

// {releasesQuery.musicBrainzReleases
//   .map(task => {
//     // let input
//
//     return <li key={task.id}>
//     </li>
//   })}

// <input
//   //  ref={node => {
//   //   input = node;
//   // }}
//   type="checkbox"
//   checked={task.status === 'completed'}
//   onChange={e => {
//     e.preventDefault()
//     task.status === 'completed'
//       ? modifyTask({ variables: {
//         uuid: task.uuid ,
//         status: 'pending'
//       }})
//       : modifyTask({ variables: {
//         uuid: task.uuid ,
//         status: 'complete'
//       }})
//
//   }}
// />{task.description}</li>

export default Home

