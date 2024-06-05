import deleteImages from './utils/deleteImages';
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/pin';

export const createPin = async (pin, currentUser, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  try {
    const result = await fetchData(
      { url, body: pin, token: currentUser?.token },
      dispatch
    );

    if (result) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'The pin has been added successfully',
        },
      });
      clearPin(dispatch, currentUser);
      dispatch({ type: 'UPDATE_SECTION', payload: 0 });
      dispatch({ type: 'UPDATE_PIN', payload: result });
    }
  } catch (error) {
    console.error('Error while creating pin:', error);
  } finally {
    dispatch({ type: 'END_LOADING' });
  }
};

export const getPins = async (dispatch) => {
  dispatch({ type: 'START_LOADING' });
  try {
    const result = await fetchData({ url, method: 'GET' }, dispatch);
    if (result) {
      dispatch({ type: 'UPDATE_PINS', payload: result });
    }
  } catch (error) {
    console.error('Error while fetching pins:', error);
  } finally {
    dispatch({ type: 'END_LOADING' });
  }
};

export const deletePin = async (pin, currentUser, dispatch) => {
  dispatch({ type: 'START_LOADING' });

  try {
    const result = await fetchData(
      { url: `${url}/${pin._id}`, method: 'DELETE', token: currentUser?.token },
      dispatch
    );
    if (result) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'The pin has been deleted successfully',
        },
      });

      dispatch({ type: 'DELETE_PIN', payload: result._id });
      deleteImages(pin.images, pin._id);
    }
  } catch (error) {
    console.error('Error while deleting pin:', error);
  } finally {
    dispatch({ type: 'END_LOADING' });
  }
};

export const updatePin = async (pin, currentUser, dispatch, updatedPin, deletedImages = []) => {
  if (!updatedPin || !updatedPin._id) {
    console.error('Invalid updatedPin object:', updatedPin);
    return;
  }

  dispatch({ type: 'START_LOADING' });

  try {
    const result = await fetchData(
      {
        url: `${url}/${updatedPin._id}`,
        method: 'PATCH',
        body: pin,
        token: currentUser?.token,
      },
      dispatch
    );
    if (result) {
      if (deletedImages.length > 0) {
        deleteImages(deletedImages, currentUser?.id);
      }

      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'The pin has been updated successfully',
        },
      });
      clearPin(dispatch, currentUser, deletedImages, updatedPin);
      dispatch({ type: 'UPDATE_SECTION', payload: 0 });
      dispatch({ type: 'UPDATE_PIN', payload: result });
    }
  } catch (error) {
    console.error('Error while updating pin:', error);
  } finally {
    dispatch({ type: 'END_LOADING' });
  }
};

export const clearPin = (dispatch, currentUser, images = [], updatedPin = null) => {
  dispatch({ type: 'RESET_PIN' });
  if (updatedPin) {
    deleteImages(images, updatedPin.uid);
  } else {
    deleteImages(images, currentUser.id);
  }
};

export const storePin = (location, details, images, updatedPin, deletedImages, addedImages, userId) => {
  if (
    location.lng ||
    location.lat ||
    details.price ||
    details.title ||
    details.description ||
    images.length
  ) {
    localStorage.setItem(
      userId,
      JSON.stringify({
        location,
        details,
        images,
        updatedPin,
        deletedImages,
        addedImages,
      })
    );
    return true;
  } else {
    return false;
  }
};
