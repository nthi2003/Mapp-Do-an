import React, { useEffect } from 'react';
import { useValue } from '../context/ContextProvider';
import jwt_decode from 'jwt-decode'; // Importing the default export correctly
import { storePin } from '../actions/pin';
import { logout } from '../actions/user';

const useCheckToken = () => {
  const {
    state: {
      currentUser,
      location,
      details,
      images,
      updatedPin,
      deletedImages,
      addedImages,
    },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwt_decode(currentUser.token); // Using jwt_decode instead of jwtDecode
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        storePin(
          location,
          details,
          images,
          updatedPin,
          deletedImages,
          addedImages,
          currentUser.id
        );
        logout(dispatch);
      }
    }
  }, [
    currentUser,
    location,
    details,
    images,
    updatedPin,
    deletedImages,
    addedImages,
    dispatch,
  ]); // Include dependencies to ensure useEffect triggers correctly

  // No need to return anything from this hook
};

export default useCheckToken;
