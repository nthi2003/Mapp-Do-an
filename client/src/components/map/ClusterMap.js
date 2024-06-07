import React, { useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getPins } from '../../actions/pin';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Supercluster from 'supercluster';
import './cluster.css';
import { Avatar, Paper, Tooltip } from '@mui/material';
import GeocoderInput from '../sidebar/GeocoderInput';
import PopupPin from './PopupPin';

const supercluster = new Supercluster({
  radius: 75,
  maxZoom: 20,
});

const ClusterMap = () => {
  const {
    state: { filteredPins },
    dispatch,
    mapRef,
  } = useValue();
  const [points, setPoints] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [bounds, setBounds] = useState([-180, -85, 180, 85]);
  const [zoom, setZoom] = useState(0);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    getPins(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (filteredPins) {
      const points = filteredPins.map((pin) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          pinId: pin._id,
          price: pin.price,
          title: pin.title,
          description: pin.description,
          lng: pin.lng,
          lat: pin.lat,
          images: pin.images,
          uPhoto: pin.uPhoto,
          uName: pin.uName,
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(pin.lng), parseFloat(pin.lat)],
        },
      }));
      setPoints(points);
    }
  }, [filteredPins]);

  useEffect(() => {
    supercluster.load(points);
    setClusters(supercluster.getClusters(bounds, zoom));
  }, [points, zoom, bounds]);

  useEffect(() => {
    if (mapRef.current) {
      setBounds(mapRef.current.getMap().getBounds().toArray().flat());
    }
  }, [mapRef]);

  return (
    <ReactMapGL
      initialViewState={{ latitude: 51.5072, longitude: 0.1276 }}
      mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
      ref={mapRef}
      onZoomEnd={(e) => setZoom(Math.round(e.viewState.zoom))}
    >
      {clusters.map((cluster) => {
        const { cluster: isCluster, point_count } = cluster.properties;
        const [longitude, latitude] = cluster.geometry.coordinates;
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              longitude={longitude}
              latitude={latitude}
            >
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (point_count / points.length) * 20}px`,
                  height: `${10 + (point_count / points.length) * 20}px`,
                }}
                onClick={() => {
                  const zoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  mapRef.current.flyTo({
                    center: [longitude, latitude],
                    zoom,
                    speed: 1,
                  });
                }}
              >
                {point_count}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={`pin-${cluster.properties.pinId}`}
            longitude={longitude}
            latitude={latitude}
          >
            <Tooltip title={cluster.properties.uName}>
              <Avatar
                src={cluster.properties.uPhoto}
                component={Paper}
                elevation={2}
                onClick={() => setPopupInfo(cluster.properties)}
              />
            </Tooltip>
          </Marker>
        );
      })}
      <GeocoderInput />
      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          maxWidth="auto"
          closeOnClick={false}
          focusAfterOpen={false}
          onClose={() => setPopupInfo(null)}
        >
          <PopupPin {...{ popupInfo }} />
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default ClusterMap;
