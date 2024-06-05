import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
  } from '@mui/material';
  import { AddLocationAlt, Image, LocationOn, Addlo } from '@mui/icons-material';
  import { useEffect, useRef, useState } from 'react';
import ClusterMap from './map/ClusterMap';
import AddLocation from './addLocation/AddLocation';
import LocationPoint from './location/LocationPoint';

const BottomNav = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
    useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0 ;
    },[value]);
  return (
    <Box ref = {ref}> 
        {
            {
                0: <ClusterMap/>,
                1: <LocationPoint/>,
                2: <AddLocation/>
            }[value]}
        <Paper
        elevation={3}
        sx={{position:'fixed', bottom: 0, left: 0, right: 0, zIndex:2}}
        >
            <BottomNavigation
            showLabels
            value={value}
            onChange={(e,newValue) => setValue(newValue)}>
                <BottomNavigationAction label='Map' icon = {<LocationOn/>}/>
                <BottomNavigationAction label='Favorite' icon = {<Image/>}/>
                <BottomNavigationAction label='Add' icon = {<AddLocationAlt/>}/>

            </BottomNavigation>
        </Paper>
    </Box>
  )
}

export default BottomNav