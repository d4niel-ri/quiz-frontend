/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { useNavigate } from 'react-router-dom';
import { getUsers } from './actions';
import { selectUsers } from './selectors';

import classes from "./style.module.scss";
import UserCard from './components/UserCard';

const Admin = ({ token, user, users }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [hasMounted, setHasMounted] = useState(false);

  console.log(users, "<< USERS");

  useEffect(() => {
    if (user.role !== 1)
      navigate("/");

    dispatch(getUsers(token));
    setHasMounted(true);
  }, []);

  if (!hasMounted) return false;
    
  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1>Admin Page</h1>
        <div className={classes.sections}>
          <section>
            <h2>Users</h2>
            <div className={classes.users}>
              {users.map((userData) => 
                <UserCard key={userData.id} user={userData} token={token} dispatch={dispatch} />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
};

Admin.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  users: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectUser,
  users: selectUsers,
});

export default connect(mapStateToProps)(Admin);