import { USER_INFO } from '../actions/type.js';

const INITIAL_STATE = {
  user: null
}

export const userDetail = (state=INITIAL_STATE.user,action) => {
  switch (action.type) {
    case USER_INFO:
      return action.user;

    default:
      return state;
  }
}
