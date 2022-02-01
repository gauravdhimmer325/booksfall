import { RETRIEVE_TOKEN } from './actions';
import { REGISTER_DATA } from './actions';
import { LOGIN_DATA } from './actions';


const initialState = {
  data: {},
  Token: {}
};



function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_DATA:
      return { ...state, data: action.payload };
    case RETRIEVE_TOKEN:
      return { ...state, Token: action.payload };
    case REGISTER_DATA:
      return { ...state, Register: action.payload };
    default:
      return state;
  }
}

export default userReducer;
