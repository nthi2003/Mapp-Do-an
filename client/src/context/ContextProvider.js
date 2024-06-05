import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import reducer from './reducer';

const initialState = {
  currentUser: null,
  openLogin: false,
  loading: false,
  alert: { open: false, severity: 'info', message: '' },
  profile: { open: false, file: null, photoURL: '' },
  images: [],
  details: { title: '', description: '', price: 0 },
  location: { lng: 0, lat: 0 },
  updatedPin: null,
  deletedImages: [],
  addedImages: [],
  pins: [],
  priceFilter: 50,
  addressFilter: null,
  filteredPins: [],
  pin: null,
  users: [],
  section: 0
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const mapRef = useRef();
  const containerRef = useRef();
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      dispatch({ type: 'UPDATE_USER', payload: currentUser });
    }
  }, []);
  
  useEffect(() => {
    if (state.currentUser) {
      const pin = JSON.parse(localStorage.getItem(state.currentUser.id));
      if (pin) {
        dispatch({ type: 'UPDATE_LOCATION', payload: pin.location });
        dispatch({ type: 'UPDATE_DETAILS', payload: pin.details });
        dispatch({ type: 'UPDATE_IMAGES', payload: pin.images });
        dispatch({ type: 'UPDATE_UPDATED_PIN', payload: pin.updatedPin });
        dispatch({
          type: 'UPDATE_DELETED_IMAGES',
          payload: pin.deletedImages,
        });
        dispatch({ type: 'UPDATE_ADDED_IMAGES', payload: pin.addedImages });
      }
    }
  }, [state.currentUser]);
  
  return (
    <Context.Provider value={{ state, dispatch, mapRef, containerRef }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
