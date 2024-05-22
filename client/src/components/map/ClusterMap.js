import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ClusterMap = () => {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 16.0902647, // Center the map to the marker's location
    longitude: 108.2373339, // Center the map to the marker's location
    zoom: 12 // Adjust zoom level as needed
  });

  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v11'); // default style

  // Adjust viewport dimensions when window size changes
  useEffect(() => {
    const handleResize = () => {
      setViewport((prevViewport) => ({
        ...prevViewport,
        width: window.innerWidth,
        height: window.innerHeight
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh', // Use full viewport height
        width: '100vw',  // Use full viewport width
        position: 'relative'
      }}
    >
      <FormControl sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1, backgroundColor: 'white' }}>
        <InputLabel id="map-style-label">Map Style</InputLabel>
        <Select
          labelId="map-style-label"
          value={mapStyle}
          label="Map Style"
          onChange={(e) => setMapStyle(e.target.value)}
        >
          <MenuItem value="mapbox://styles/mapbox/streets-v11">Streets</MenuItem>
          <MenuItem value="mapbox://styles/mapbox/satellite-v9">Satellite</MenuItem>
          <MenuItem value="mapbox://styles/mapbox/satellite-streets-v11">Satellite Streets</MenuItem>
          <MenuItem value="mapbox://styles/mapbox/streets-v11?language=vi">Streets (Vietnamese)</MenuItem>
        </Select>
      </FormControl>
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onMove={(evt) => setViewport(evt.viewState)}
        mapStyle={mapStyle} // Use the state mapStyle
        dragPan={true}
        dragRotate={true}
        scrollZoom={true}
        doubleClickZoom={true}
      >
        <Marker
          latitude={16.0902647}
          longitude={108.2373339}
          offsetLeft={-10} // Adjust offsets as needed
          offsetTop={-10}  // Adjust offsets as needed
        >
          <div style={{ color: 'red' }}>📍</div>
        </Marker>
      </ReactMapGL>
    </Box>
  );
};

export default ClusterMap;
