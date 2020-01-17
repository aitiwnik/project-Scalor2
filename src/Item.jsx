import React, {useState} from 'react'
import {Button, TextField, List, ListItem, ListItemAvatar, Avatar, Divider} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import AppleIcon from '@material-ui/icons/Apple';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: '2px'
  },
  inline: {
    display: 'inline',
  },
}));

export const Item = ({title, beginDate, expirationDate, id, users, devices, handleTitle, handleRemove}) => {
  const [value, updateValue] = useState(title)
  const setValue = ({target}) => updateValue(target.value)
  const classes = useStyles();

  const user = users.filter(us => us.projectId === id)
  const device = devices.filter(dev => dev.projectId === id)
  const handler = ({target}) => handleTitle(id, target.value)
  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '45% 45%',
        justifyContent: 'space-between'
      }}>
        <Button
          component="button"
          variant="contained"
          color="secondary"
          onClick={() => handleRemove(id)}
        >Delete</Button>
        <TextField
          id="outlined-secondary"
          label="Project Name"
          variant="outlined"
          color="secondary"
          type='text'
          value={value}
          onChange={setValue}
          onBlur={handler}
        />
      </div>
      <p>{new Date(beginDate).toDateString()} - {new Date(expirationDate).toDateString()}</p>
      <List className={classes.root}>
        {user.map(el => <div><ListItem style={{padding: '2px'}}>
          <ListItemAvatar>
            <Avatar alt={el.firstName} src="/static/images/avatar/1.jpg"/></ListItemAvatar>{el.firstName} {el.lastName}
        </ListItem><Divider variant="inset" component="li"/></div>)}
      </List>
      <List style={{padding: '2px'}}>
        {device.map(el => <div><ListItem>
          <AppleIcon fontSize="large"/>{el.serialNumber}</ListItem><Divider variant="inset" component="li"/></div>)}
      </List>
    </>
  )
}
