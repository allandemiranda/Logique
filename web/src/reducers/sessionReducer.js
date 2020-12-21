import * as actionTypes from 'actions';

const initialState = {
  usuario: {},
  token: '',
  erroLogin: false,
  loggedIn: false
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...initialState,
        loggedIn: true,
        erroLogin: false,
        token: action.token,
        usuario: action.usuario
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        usuario: {},
        token: '',
        erroLogin: false,
        loggedIn: false
      };
    }

    case actionTypes.SESSION_ERROR: {
      return {
        ...state,
        usuario: {},
        token: '',
        erroLogin: true,
        loggedIn: false
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
