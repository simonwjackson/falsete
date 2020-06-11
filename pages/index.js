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

const SimpleList = ({ list }) =>  {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List>
        {list.map(item => ( 
          <ListItem alignItems="flex-start" key={item.id}>
            <ListItemAvatar>
              <Avatar alt={item.title} src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={
                <React.Fragment>
                  <Link href="/player/[mbid]" as={`/player/${item.id}`}>
                    {item.artists[0].name}
                  </Link>
                </React.Fragment>
              }
            />
          </ListItem> 
        ))}
      </List>
    </div>
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
  const { data: releasesQuery, loading, error } = useQuery(RELEASE_GROUP_QUERY)
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

  if (loading) 
    return <p>Loading...</p>

  if (error) 
    return <p>Error: {JSON.stringify(error)}</p>

  console.log(releasesQuery)

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <SimpleList list={releasesQuery.musicBrainzReleases} />
      </Box>
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

