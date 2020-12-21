import axios from 'utils/axios';

export const criar = (payload, router, token) => {
  return async dispatch => {
    const dados = {
      urlOriginal: payload.values.url
    };
    const response = await axios
      .post('/url/', dados, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .catch(async err => {
        console.log('/url/', err);
      });
    if (response) {
      dispatch({
        data: true,
        type: 'SESSION_URL'
      });
    }
  };
};
