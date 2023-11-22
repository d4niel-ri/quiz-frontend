/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@mui/material';

import { changeUsername } from '@pages/Settings/actions';
import classes from "./style.module.scss";

const ChangeUsername = ({ openUsername, handleCloseUsername, username, token }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState(username);
  const [error, setError] = useState("");

  const validateInput = () => {
    if (!input) {
      setError("You must fill username");

      return false;
    }

    return true;
  }

  const handleClose = () => {
    handleCloseUsername();
  }

  const handleSave = () => {
    setError("");

    // eslint-disable-next-line no-useless-return
    if (!validateInput()) return;
    
    dispatch(changeUsername(token, input, handleClose, setError))
  }

  useEffect(() => {
    setError("");
    setInput(username);
    
  }, [openUsername])

  return (
    <Dialog open={openUsername} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h2>Change username</h2>
          <input 
            type="text" name="username" id="username" value={input} onChange={(e) => {setInput(e.target.value)}} 
          />
          {error && (<p className={classes.error}>{error}</p>)}
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' className={classes.save} onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Dialog>
  )
}

ChangeUsername.propTypes = {
  openUsername: PropTypes.bool.isRequired,
  handleCloseUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}

export default ChangeUsername;
