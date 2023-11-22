import MainLayout from '@layouts/MainLayout';

import ForgotPassword from '@pages/ForgotPassword';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
    layout: MainLayout,
  },
  {
    path: '/register',
    name: 'Register',
    protected: false,
    component: Register,
    layout: MainLayout,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    protected: false,
    component: ForgotPassword,
    layout: MainLayout,
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    protected: false,
    component: ResetPassword,
    layout: MainLayout,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
