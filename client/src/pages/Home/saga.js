import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllMenu } from '@domain/api';
import { setLoading } from '@containers/App/actions';
import { GET_ALL_MENUS } from './constants';
import { setAllMenus } from './actions';

function* doGetAllMenus() {
  yield put(setLoading(true));
  try {
    const response = yield call(getAllMenu);
    yield put(setAllMenus(response));
  } catch (e) {
    yield put(showPopup());
  } finally {
    yield put(setLoading(false));
  }
}

export function* homeSaga() {
  yield takeLatest(GET_ALL_MENUS, doGetAllMenus);
}
