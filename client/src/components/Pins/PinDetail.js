import { AppBar, Avatar, Box, Container, Dialog, IconButton, Rating, Slide, Stack, Toolbar, Tooltip, Typography } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import { useValue } from '../../context/ContextProvider'
import { Close, StarBorder } from '@mui/icons-material';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swiper.css';

const Transition = forwardRef((props, ref) => {
  return <Slide direction='up' {...props} ref={ref} />
})
const PinDetail = () => {
  const { state: { pin }, dispatch } = useValue()
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (pin) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${pin.lng},${pin.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  }, [pin]);
  const handleClose = () => {
    dispatch({ type: "UPDATE_PIN", payload: null })
  }
  return (
    <Dialog
      fullScreen
      open={Boolean(pin)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position='relative' sx={{backgroundColor: 'black'}}>
        <Toolbar>
          <Typography
            variant='h6'
            component='h3'
            sx={{ ml: 2, flex: 1 }}
          >
            {pin?.title}
          </Typography>
          <IconButton color='inherit' onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>

      </AppBar>
      <Container sx={
        {
          pt: 5
        }
      }>
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow, Lazy, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay
          lazy
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {pin?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="pin" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip title={pin?.uName || ''}
            sx={{
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              zIndex: 2,
            }}
          >
            <Avatar src={pin?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Price : '}
              </Typography>
              <Typography component="span">
                {pin?.price === 0 ? 'Free Stay' : '$' + pin?.price}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" component="span">
                {'Ratings: '}
              </Typography>
              <Rating
                name="pin-ratings"
                defaultValue={3.5}
                precision={0.5}
                emptyIcon={<StarBorder />}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {'Place Name: '}
              </Typography>
              <Typography component="span">{place?.text}</Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="span">
                {'Address: '}
              </Typography>
              <Typography component="span">{place?.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {'Details: '}
            </Typography>
            <Typography component="span">{pin?.description}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default PinDetail
