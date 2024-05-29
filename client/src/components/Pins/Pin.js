import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from '@mui/material';
import { useValue } from '../../context/ContextProvider';
import { StarBorder } from '@mui/icons-material';

const Pin = () => {
  const {
    state: {filteredPin  },
    dispatch
  } = useValue();
  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))!important',
        }}
      >
        {filteredPin.map((pin) => (
          <Card key={pin._id}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <ImageListItemBar
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                }}
                title={pin.price === 0 ? 'Free Stay' : '$' + pin.price}
                actionIcon={
                  <Tooltip title={pin.uName} sx={{ mr: '5px' }}>
                    <Avatar src={pin.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />
              <img
                src={pin.images[0]}
                alt={pin.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch({type:'UPDATE_PIN', payload: pin})}
              />
              <ImageListItemBar
                title={pin.title}
                actionIcon={
                  <Rating
                    sx={{ color: 'rgba(255,255,255, 0.8)', mr: '5px' }}
                    name="pin-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: 'rgba(255,255,255, 0.8)' }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Pin;