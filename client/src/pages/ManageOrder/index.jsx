import { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Swal from 'sweetalert2';

import style from './style.module.scss';
import { setBasket } from '@pages/Basket/actions';
import { selectBaskets } from '@pages/Basket/selectors';

const ManageOrder = ({ menus, baskets }) => {
  return (
    <div className={style.manageOrder}>
      <h1>Manage Order</h1>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  baskets: selectBaskets,
});

export default connect(mapStateToProps)(ManageOrder);
