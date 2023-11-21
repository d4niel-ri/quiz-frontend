import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLogin, selectToken } from '@containers/Client/selectors';
import { verifyToken } from './actions';

const Client = ({ login, token, children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
    dispatch(verifyToken(token, navigate));
  }, [login, navigate]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken,
});

export default connect(mapStateToProps)(Client);
