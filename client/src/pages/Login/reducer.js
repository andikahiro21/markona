import { produce } from 'immer';

import { LOGIN_FAILURE } from './constants';

export const initialState = {
  loginError: '',
};

export const storedKey = ['token', 'login'];

const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_FAILURE:
        draft.loginError = action.message;
        break;
    }
  });

export default loginReducer;
