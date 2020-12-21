import axios from 'utils/axios';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_ERROR = 'SESSION_ERROR';

export const login = (payload, router) => {
  return async dispatch => {
    const dados = {
      login: payload.values.login,
      senha: payload.values.senha
    };
    const response = await axios
      .post('/auth/local/', dados)
      .catch(async err => {
        console.log('/auth/local/', err);
        dispatch(await erroSession());
      });
    if (response) {
      if (!response.data.usuario || !response.data.token) {
        return dispatch(await erroSession());
      }
      return dispatch(
        await setSession(response.data.token, response.data.usuario, router),
        router.history.push(`/`)
      );
    }
  };
};

export const erroSession = async () => {
  return async dispatch => {
    dispatch({
      type: SESSION_ERROR
    });
  };
};

export const setSession = async (token, usuario) => {
  return async dispatch => {
    await dispatch({
      type: SESSION_LOGIN,
      token: token,
      usuario: usuario
    });
  };
};

export const logout = router => {
  return async dispatch => {
    dispatch(await logoutSession());
    router.history.push(`/auth/login/`);
  };
};

export const logoutSession = async () => {
  return async dispatch => {
    dispatch({
      type: SESSION_ERROR
    });
  };
};
