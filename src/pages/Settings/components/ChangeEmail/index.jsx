/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog } from '@mui/material';

import { changeEmail } from '@pages/Settings/actions';

import classes from "./style.module.scss";

const ChangeEmail = ({ openEmail, handleCloseEmail, email, token }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState(email);
  const [error, setError] = useState("");
  
  const validateInput = () => {
    if (!input) {
      setError("You must fill an email address");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(input)) {
      setError("Please fill an email address");
      return false;
    }

    return true;
  }

  const handleClose = () => handleCloseEmail();

  const handleSave = () => {
    setError("");

    // eslint-disable-next-line no-useless-return
    if (!validateInput()) return;

    dispatch(changeEmail(token, input, handleClose, setError));
  }

  useEffect(() => {
    setError("");
    setInput(email);
  }, [openEmail]);

  return (
    <Dialog open={openEmail} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <h2>Change email</h2>
          <input 
            type="text" name="email" id="email" value={input} onChange={(e) => {setInput(e.target.value)}} 
          />
          {error && (<p className={classes.error}>{error}</p>)}
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' className={classes.save} onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Dialog>
  );
};

ChangeEmail.propTypes = {
  openEmail: PropTypes.bool.isRequired,
  handleCloseEmail: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}

export default ChangeEmail;