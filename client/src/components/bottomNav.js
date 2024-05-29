import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Paper,
  } from '@mui/material';
  import { AddLocationAlt, LocationOn } from '@mui/icons-material';
  import PersonPinIcon from '@mui/icons-material/PersonPin';
  import { useEffect, useRef, useState } from 'react';
  import ClusterMap from './map/ClusterMap';
  import Pins from './Pins/Pin';
  import AddPin from './addPin/AddPin';

  
  const BottomNav = () => {
    const [value, setValue] = useState(0);
    const ref = useRef();
    useEffect(() => {
      ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);
    return (
      <Box ref={ref}>
        {
          {
            0: <ClusterMap />,
            1: <Pins />,
            2: <AddPin setPage={setValue} /> , //set trang ne 
          }[value]
        }
        <Paper
          elevation={3}
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2 }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
          >
            <BottomNavigationAction label="Bản đồ" icon={<LocationOn />} />
            <BottomNavigationAction label="Địa điểm" icon={<PersonPinIcon />} />
            <BottomNavigationAction label="Thêm" icon={<AddLocationAlt />} />
          </BottomNavigation>
        </Paper>
      </Box>
    );
  };
  
  export default BottomNav;