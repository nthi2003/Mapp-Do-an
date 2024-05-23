import React from 'react'
import {AppBar, Box, Button, Container, Icon, IconButton, Toolbar, Typography} from "@mui/material"
import {Menu, Lock} from '@mui/icons-material'
import photoURL from '../p.png'
import { useValue } from '../context/ContextProvider'
import UserIcons from './user/UserIcons'

const user = {name:'test', photoURL}

const NavBar = () => {

    const {state:{currentUser},
    dispatch
    } = useValue()

    return (
        <AppBar>
                <Container maxWidth='lg'>
                    <Toolbar disableGuttrs>
                    <Box sx={{mr:1}}>
                        <IconButton size='large' color='inherit'>
                            <Menu />
                        </IconButton>
                    </Box>
                    <Typography
                    variant='h6'
                    component='h1'
                    noWrap
                    sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}
                    >
                        you are welcome
                    </Typography>
                    <Typography
                    variant='h6'
                    component='h1'
                    noWrap
                    sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}
                    >
                        yrw
                    </Typography>
                    {!currentUser ? (
                        <Button
                            color="inherit" 
                            startIcon={<Lock />} 
                            onClick={()=> dispatch({type:'OPEN_LOGIN'})}>
                            Login
                        </Button>): (
                        <UserIcons />
                     )}
                    
                    </Toolbar>
                </Container>
        </AppBar>
    )
}

export default NavBar