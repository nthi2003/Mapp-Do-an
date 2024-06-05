import React from 'react';
import Box from '@mui/material/Box'; 
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { useValue } from '../../../src/context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';

const AddLocation = () => {
  return(
   <div>Addlocation</div> 
  )
};

export default AddLocation;
