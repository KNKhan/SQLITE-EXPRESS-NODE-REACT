import axios from 'axios';

export const getUsers = (start, end) => {
  return (dispatch) => {
    axios
      .get('http://localhost:8000/api/users?start='+start+'&end='+end)
      .then((response) => {
        dispatch({
          type: 'LIST_USERS',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
