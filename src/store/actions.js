
export const LOGIN_DATA = 'LOGIN_DATA';
export const LOGOUT = 'LOGOUT';
export const CLEAR_REDUX_STATE = 'CLEAR_REDUX_STATE';
export const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN';
export const REGISTER_DATA = 'REGISTER_DATA';



export const userTokenData = Token => {
  //console.log('userTokenAction 165=======', Token);
  return async dispatch => {
    dispatch({
      type: RETRIEVE_TOKEN,
      payload: Token,
    });
  };
};


export const LoginData = Login => {
  //console.log('LOgonfgg=======', Login);
  return async dispatch => {
    dispatch({
      type: LOGIN_DATA,
      payload: Login,
    });
  };
};

export const RegisterData = json => {
  // console.log('LOgonfgg=======', json);
  return async dispatch => {
    dispatch({
      type: REGISTER_DATA,
      payload: Register,
    });
  };
};


export const LogOut = LogOut => {
  //console.log('LogOutAction 185 =======', LogOut);
  return async dispatch => {
    dispatch({
      type: CLEAR_REDUX_STATE,
    });
  };
};
