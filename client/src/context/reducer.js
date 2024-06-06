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

    case 'UPDATE_PIN':
      return { ...state, pin: action.payload };

    case 'UPDATE_USER':
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case 'UPDATE_IMAGES':
      return { ...state, images: [...state.images, ...action.payload] };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };
    case 'UPDATE_DETAILS':
      return { ...state, details: { ...state.details, ...action.payload } };
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload };

    case 'RESET_PIN':
      return {
        ...state,
        images: [],
        details: { title: '', description: '', price: 0 },
        location: { lng: 0, lat: 0 },
        updatedPin: null,
        deletedImages: [],
        addedImages: [],
      };

    case 'UPDATE_PINS':
      return {
        ...state,
        pins: action.payload,
        addressFilter: null,
        priceFilter: 50,
        filteredPins: action.payload,
      };

    case 'FILTER_PRICE':
      return {
        ...state,
        priceFilter: action.payload,
        filteredPins: applyFilter(state.pins, state.addressFilter, action.payload),
      };

    case 'FILTER_ADDRESS':
      return {
        ...state,
        addressFilter: action.payload,
        filteredPins: applyFilter(state.pins, action.payload, state.priceFilter),
      };

    case 'CLEAR_ADDRESS':
      return {
        ...state,
        addressFilter: null,
        priceFilter: 50,
        filteredPins: state.pins,
      };

    case 'UPDATE_UPDATED_PIN':
      return { ...state, updatedPin: action.payload };

    case 'UPDATE_DELETED_IMAGES':
      return {
        ...state,
        deletedImages: [...state.deletedImages, ...action.payload],
      };

    case 'UPDATE_ADDED_IMAGES':
      return {
        ...state,
        addedImages: [...state.addedImages, ...action.payload],
      };

    case 'UPDATE_USERS':
      return { ...state, users: action.payload };

    case 'DELETE_PIN':
      return {
        ...state,
        pins: state.pins.filter((pin) => pin._id !== action.payload),
      };

    case 'UPDATE_SECTION':
      return { ...state, section: action.payload };

    default:
      throw new Error('No matched action!');
  }
};

export default reducer;

const applyFilter = (pins, address, price) => {
  let filteredPins = pins;
  if (address) {
    const { lng, lat } = address;
    filteredPins = filteredPins.filter((pin) => {
      const lngDifference = Math.abs(lng - pin.lng);
      const latDifference = Math.abs(lat - pin.lat);
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  if (price < 50) {
    filteredPins = filteredPins.filter((pin) => pin.price <= price);
  }

  return filteredPins;
};
