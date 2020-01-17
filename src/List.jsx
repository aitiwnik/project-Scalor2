import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Item} from './Item'
import {Button, Grid, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export const List = () => {
  const [projects, updateProjects] = useState([])
  const [users, updateUsers] = useState([])
  const [devices, updateDevices] = useState([])
  const classes = useStyles()

  useEffect(() => {
    axios.get('http://localhost:3004/projects').then(({data}) => updateProjects(data))
    axios.get('http://localhost:3004/devices').then(({data}) => updateDevices(data))
    axios.get('http://localhost:3004/users').then(({data}) => updateUsers(data))
  }, [])

  const handleTitle = (id, newTitle) => updateProjects(
    prevState => {
      const projectCurrent = prevState.find(el => el.id === id)
      const projectIndex = prevState.indexOf(projectCurrent)
      const newState = [...prevState]

      newState[projectIndex].title = newTitle
      return newState
    }
  )

  const handleRemove = id => updateProjects(
    prevState => prevState.filter(item => item.id !== id)
  )

  return (
    projects.length
      ? <Grid
        className={classes.root}
        container
      >
        {projects.map(el =>
          <Paper className={classes.paper}
                 style={{backgroundColor: '#4d46de', margin: '2px 2px', justifyContent: 'space-between'}}>
            <Item
              container item xs={4} spacing={3}
              {...el}
              key={el.id}
              users={users}
              devices={devices}
              handleTitle={handleTitle}
              handleRemove={handleRemove}
            />
          </Paper>
        )}
      </Grid>
      :
      <>
        <h1>Not found ...</h1>
        <Button
          component="button"
          variant="contained"
          color="secondary"
          onClick={() => axios.get('http://localhost:3004/projects').then(({data}) => updateProjects(data))}
        >Reset</Button>
      </>
  )
}

