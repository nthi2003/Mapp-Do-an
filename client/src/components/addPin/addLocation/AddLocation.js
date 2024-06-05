import React from 'react';
import Box from '@mui/material/Box'; 
import ReactMapGL, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl';
import { useValue } from '../../../context/ContextProvider';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import Geocoder from './Geocoder';

const AddLocation = () => {
  const {
    state: {
      currentUser,
      location: { lng, lat },
    },
    dispatch,
  } = useValue();
  const mapRef = useRef();

  useEffect(() => {
    const storedLocation = JSON.parse(
      localStorage.getItem(currentUser.id)
    )?.location;
    if (!lng && !lat  && !storedLocation?.lng && !storedLocation?.lat) {
      fetch('https://ipapi.co/')
        .then((response) => response.json())
        .then((data) => {
          
          dispatch({
            type: 'UPDATE_LOCATION',
            payload: { lng: data.longitude, lat: data.latitude },
          });
        });
    }
  }, []);
  useEffect(() => {
    if ((lng || lat) && mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
      });
    }
  }, [lng, lat]);
  return (
    <>
      {currentUser && ( 
        <Box
          sx={{
            height: 400,
            position: 'relative',
          }}
        >
          <ReactMapGL
            ref={mapRef}
            mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
            initialViewState={{
              longitude: lng,
              latitude: lat,
              zoom: 8,
            }}
            mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          >
            <Marker
              latitude={lat}
              longitude={lng}
              draggable
              onDragEnd={(e) =>
                dispatch({
                  type: 'UPDATE_LOCATION',
                  payload: { lng: e.lngLat.lng, lat: e.lngLat.lat },
                })
              }
            />
            <NavigationControl position="bottom-right" />
            <GeolocateControl
              position="top-left"
              trackUserLocation
              onGeolocate={(e) =>
                dispatch({
                  type: 'UPDATE_LOCATION',
                  payload: { lng: e.coords.longitude, lat: e.coords.latitude },
                })
              }
            />
            <Geocoder />
          </ReactMapGL>
        </Box>
      )}

      {!currentUser && 
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <p style={{}}>Login now</p>
      </div>}

    </>
  );
};

export default AddLocation;
