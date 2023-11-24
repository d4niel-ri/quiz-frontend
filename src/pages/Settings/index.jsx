/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import config from '@config/index';

import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { Avatar, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import ChangeUsername from './components/ChangeUsername';
import ChangeEmail from './components/ChangeEmail';
import ChangeImage from './components/ChangeImage';

import classes from "./style.module.scss";

const Settings = ({ token, user }) => {
  
  const [openUsername, setOpenUsername] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const handleClickOpenUsername = () => {
    setOpenUsername(true);
  };

  const handleCloseUsername = () => {
    setOpenUsername(false);
  };

  const handleClickOpenEmail = () => {
    setOpenEmail(true);
  }

  const handleCloseEmail = () => {
    setOpenEmail(false);
  }

  const handleClickOpenImage = () => {
    setOpenImage(true);
  }

  const handleCloseImage = () => {
    setOpenImage(false);
  }

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1><FormattedMessage id="app_settings" /></h1>
        <div className={classes.sections}>
          <section>
            <div className={classes.title}>
              <AccountBoxIcon className={classes.profile_icon} />
              <h2>Profile</h2>
            </div>
            <div className={classes.section_image}>
              <div className={classes.profile_image}>
                {user.imageUrl ? (
                  <img src={`${config.api.host}${user.imageUrl}`} alt=""/>
                ) : (
                  <Avatar className={classes.img} />
                )}
              </div>
              <Button variant='contained' onClick={handleClickOpenImage} className={classes.btn}>
                <FormattedMessage id='app_change_image' />
              </Button>
            </div>
            <div className={classes.rows}>
              <div className={classes.row} onClick={handleClickOpenUsername}>
                <div className={classes.left_row}>
                  <div className={classes.label}>Username</div>
                  <div className={classes.value}>{user.username}</div>
                </div>
                <KeyboardArrowRightIcon className={classes.right_icon} />
              </div>
              <div className={classes.row} onClick={handleClickOpenEmail}>
                <div className={classes.left_row}>
                  <div className={classes.label}>Email</div>
                  <div className={classes.value}>{user.email}</div>
                </div>
                <KeyboardArrowRightIcon className={classes.right_icon} />
              </div>
            </div>
          </section>
        </div>
      </div>

      <ChangeUsername 
        openUsername={openUsername} handleCloseUsername={handleCloseUsername} username={user.username}
        token={token}
      />
      <ChangeEmail
        openEmail={openEmail} handleCloseEmail={handleCloseEmail} email={user.email} token={token}
      />

      <ChangeImage openImage={openImage} handleCloseImage={handleCloseImage} token={token} />
    </main>
  )
};

Settings.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(Settings);
