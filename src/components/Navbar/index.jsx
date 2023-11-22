import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocalActivitySharpIcon from '@mui/icons-material/LocalActivitySharp';
import config from '@config/index';

import { setLocale } from '@containers/App/actions';

import { Divider, ListItemIcon } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { logout } from '@containers/Client/actions';

import classes from './style.module.scss';

// eslint-disable-next-line no-unused-vars
const Navbar = ({ isLogin, user, title, locale, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);

  const [anchorProfile, setAnchorProfile] = useState(null);
  const openDropdownProfile = Boolean(anchorProfile);

  const handleClickProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorProfile(null);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <img src="/vite.svg" alt="logo" className={classes.logo} />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          {isLogin && (
            <div className={classes.profile} onClick={handleClickProfile}>
              {user.imageUrl ? (
                <img src={`${config.api.host}${user.imageUrl}`} alt="" />
              ) : (
                <Avatar className={classes.img} />
              )}
            </div>
          )}
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
        </div>
        <Menu
          anchorEl={anchorProfile}
          id="account-menu"
          open={openDropdownProfile}
          onClose={handleCloseDropdown}
          onClick={handleCloseDropdown}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 11,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" className={classes.settings_icon} />
            </ListItemIcon>
            Settings
          </MenuItem>
          {user && user.role === 1 && (
            <MenuItem onClick={() => navigate('/admin')}>
              <ListItemIcon>
                <SupervisorAccountIcon fontSize="small" className={classes.admin_icon} />
              </ListItemIcon>
              Admin Page
            </MenuItem>
          )}
          <MenuItem onClick={() => navigate('/activity')}>
            <ListItemIcon>
              <LocalActivitySharpIcon fontSize="small" className={classes.activity_icon} />
            </ListItemIcon>
            Activity
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => dispatch(logout(navigate))}>
            <ListItemIcon>
              <Logout fontSize="small" className={classes.logout_icon} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
          <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/id.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_id" />
              </div>
            </div>
          </MenuItem>
          <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
            <div className={classes.menu}>
              <Avatar className={classes.menuAvatar} src="/en.png" />
              <div className={classes.menuLang}>
                <FormattedMessage id="app_lang_en" />
              </div>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object,
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
};

export default Navbar;
