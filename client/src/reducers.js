import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import basketReducer, { storedKey as storedBasketState } from '@pages/Basket/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';
import loginReducer from '@pages/Login/reducer';
import registerReducer from '@pages/Register/reducer';
import forgotReducer from '@pages/ForgotPassword/reducer';
import resetReducer from '@pages/ResetPassword/reducer';
import homeReducer from '@pages/Home/reducer';
import orderReducer from '@pages/Order/reducer';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  basket: { reducer: basketReducer, whitelist: storedBasketState },
};

const temporaryReducers = {
  language: languageReducer,
  login: loginReducer,
  register: registerReducer,
  forgotPassword: forgotReducer,
  resetPassword: resetReducer,
  home: homeReducer,
  order: orderReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
