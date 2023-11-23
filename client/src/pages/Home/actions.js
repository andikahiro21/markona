import { GET_ALL_MENUS, SET_ALL_MENUS } from './constants';

export const getAllMenus = () => ({
  type: GET_ALL_MENUS,
});

export const setAllMenus = (menus) => ({
  type: SET_ALL_MENUS,
  payload: menus,
});
