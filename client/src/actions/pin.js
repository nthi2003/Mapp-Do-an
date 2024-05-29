import fetchData from "./utils/fetchData";
const url = process.env.REACT_APP_SERVER_URL + '/pin'; 
export const createPin = async (pin, currentUser, dispatch , setPage) => {
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
                    message: 'The pin has been added successfully'
                }
            });
            dispatch({ type: 'RESET_PIN'})
            setPage(0)
            dispatch({ type:'UPDATE_PIN', payload:result})
        }
    } catch (error) {
        console.error('Error while creating pin:', error);

    } finally {
        dispatch({ type: 'END_LOADING' });
    }
};
export const getPins = async (dispatch) => {
    const result = await fetchData({ url, method: 'GET' }, dispatch);
    if (result) {
      dispatch({ type: 'UPDATE_PINS', payload: result });
    }
  };