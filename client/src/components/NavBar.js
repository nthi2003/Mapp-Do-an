import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { Lock, Menu } from '@mui/icons-material';

import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import Sidebar from './sidebar/Sidebar';

const NavBar = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const [isOpen , setIsOpen] = useState(false)
  return (
    <>
    <AppBar sx={{
      bgcolor:'#E1F7F5'
    }}>
      <Container maxWidth="lg" >
        <Toolbar disableGutters>
          <Box sx={{ mr: 1  }}>
            <IconButton size="large" color="inherit" onClick={()=>setIsOpen(true)}>
              <Menu sx={{
                color:'black'
              }} />
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' , color:'black' } }}
          >
            You Are Welcome
          </Typography>
          <Typography
            variant="h6"
            component="h1"
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, color:'black' }}
          >
            YRW
          </Typography>
          {!currentUser ? (
            <Button
              color="inherit"
              startIcon={<Lock sx={{ color: 'black'}} />}
              onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
              sx ={{color: 'black'}}
            >
              Login
            </Button>
          ) : (
            <UserIcons sx={{
              color:'black'
            }} />
          )}
        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar />
    <Sidebar {...{isOpen, setIsOpen}} />
    </>
  );
};

export default NavBar;