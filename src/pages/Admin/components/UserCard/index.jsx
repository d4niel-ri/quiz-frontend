/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import config from '@config/index';
import DeleteIcon from '@mui/icons-material/Delete';

import { Avatar, Button, Dialog, IconButton } from '@mui/material';
import { deleteUser } from '@pages/Admin/actions';
import classes from "./style.module.scss";

const UserCard = ({ user, token, dispatch }) => {
  const [open, setOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const validateInput = () => {
    if (!confirmPassword) {
      setError("You must fill your password");
      return false;
    }

    return true;
  }

  const handleDelete = () => {
    setError("");

    // eslint-disable-next-line no-useless-return
    if (!validateInput()) return;

    dispatch(deleteUser(token, user.id, confirmPassword, handleClose, setError));
  }

  useEffect(() => {
    setError("");
    setConfirmPassword("");
  }, [open])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      <div className={classes.card}>
        <div className={classes.card_left}>
          <div className={classes.profile_image}>
            {user.imageUrl ? (
              <img src={`${config.api.host}${user.imageUrl}`} alt=""/>
            ) : (
              <Avatar className={classes.img} />
            )}
          </div>
          <div className={classes.attributes}>
            <p className={classes.username}>
              <b>Username:</b> {user.username}
            </p>
            <p className={classes.email}>
              <b>Email:</b> {user.email}
            </p>
            <p className={classes.role}>
              <b>Role:</b> {user.role === 1 ? "Admin" : "User"}
            </p>
          </div>
        </div>
        <IconButton className={classes.btn} onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className={classes.dialog}>
          <div className={classes.content}>
            <h2>Verification</h2>
            <div className={classes.message}>We need you password to confirm this deletion</div>
            <input 
              type="password" name='password' id='password' value={confirmPassword} 
              onChange={(e) => {setConfirmPassword(e.target.value)}} 
            />
            {error && (<p className={classes.error}>{error}</p>)}
          </div>
          <div className={classes.buttons}>
            <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
            <Button variant='contained' className={classes.confirm} onClick={handleDelete}>Confirm</Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default UserCard;
