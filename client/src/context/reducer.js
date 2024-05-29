const reducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN':
      return { ...state, openLogin: true };
    case 'CLOSE_LOGIN':
      return { ...state, openLogin: false };

    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false };

    case 'UPDATE_ALERT':
      return { ...state, alert: action.payload };

    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, action.payload] };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };
    case "RESET_PIN": 
       return {
        ...state, 
        image: [] , 
        details: {title: '' , description: '' , price: 0},
        location: { lng: 0 , lat: 0},
      }
    case "UPDATE_PINS":
       return {...state, pins: action.payload , addressFilter:null , priceFilter:50 , filteredPin: action.payload}  
    case "FILTER_PRICE" :
      return { ...state, priceFilter: action.payload , filteredPin: applyFilter(
        state.pins , state.addressFilter , action.payload
      )}
      case 'FILTER_ADDRESS':
        return {
          ...state,
          addressFilter: action.payload,
          filteredPin: applyFilter(state.pins ,action.payload,
            state.priceFilter)
          
        };
      case 'CLEAR_ADDRESS':
        return {
          ...state,
          addressFilter: null,
          priceFilter: 50,
          filteredPin: state.pins,
        };
      case 'UPDATE_PIN':
      return {...state, pin : action.payload } 
      case 'UPDATE_USERS' :
        return {...state, users : action.payload} 
    default:
      throw new Error('No matched action!');
  }
};

export default reducer;
const applyFilter = (pins, address, price) => {
  let filteredPin = pins;
  if (address) {
    const { lng, lat } = address;
    filteredPin = filteredPin.filter((pin) => {
      const lngDifference = lng > pin.lng ? lng - pin.lng : pin.lng - lng;
      const latDifference = lat > pin.lat ? lat - pin.lat : pin.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  if (price < 50) {
    filteredPin = filteredPin.filter((pin) => pin.price <= price);
  }

  return filteredPin;
};