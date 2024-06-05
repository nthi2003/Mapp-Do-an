import { Group, MapsHomeWork } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

import { getUsers } from '../../../actions/user';
import { useValue } from '../../../context/ContextProvider';
import moment from 'moment';

import { getPins } from '../../../actions/pin';
import PiePinsCost from './PiePinsCost';
import AreaPinsUsers from './AreaPinsUsers';

const Main = ({ setSelectedLink, link }) => {
  const {
    state: { pins, users, currentUser },
    dispatch,
  } = useValue();
  useEffect(() => {
    setSelectedLink(link);
    if (pins.length === 0) getPins(dispatch);
    if (users.length === 0) getUsers(dispatch, currentUser);
  }, []);
  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Users</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total pins</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapsHomeWork sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{pins.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography>Recently added Users</Typography>
          <List>
            {users.slice(0, 4).map((user, i) => (
              <Box key={user._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={user?.name} src={user?.photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.name}
                    secondary={`Time Created: ${moment(user?.createdAt).format(
                      'YYYY-MM-DD H:mm:ss'
                    )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Recently added pins</Typography>
          <List>
            {pins.slice(0, 4).map((pin, i) => (
              <Box key={pin._id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt={pin?.title}
                      src={pin?.images[0]}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={pin?.title}
                    secondary={`Added: ${moment(pin?.createdAt).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <PiePinsCost />
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <AreaPinsUsers />
      </Paper>
    </Box>
  );
};

export default Main;
