/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createStructuredSelector } from 'reselect';

import { register } from '@containers/Client/actions';
import { selectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Register = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "", username: "", password: "",
  });

  const [errors, setErrors] = useState({
    email: "", username: "", password: ""
  });

  const [mainError, setMainError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const validateEmail = () => {
    if (!inputs.email) {
      setErrors((prev) => ({...prev, email: "app_error_required"}));
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(inputs.email)) {
      setErrors((prev) => ({...prev, email: "Please fill an email address"}));
      return false;
    }

    return true;
  }

  const validateUsername = () => {
    if (!inputs.username) {
      setErrors((prev) => ({...prev, username: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validatePassword = () => {
    if (!inputs.password) {
      setErrors((prev) => ({...prev, password: "app_error_required"}));
      return false;
    }

    if (inputs.password.length < 6) {
      setErrors((prev) => ({...prev, password: "Min 6 characters"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    const isValidatedEmail = validateEmail();
    const isValidatedUsername = validateUsername();
    const isValidatedPassword = validatePassword();

    if (!isValidatedEmail || !isValidatedUsername || !isValidatedPassword)
      return false;

    return true;
  }

  const handleRegisterError = (errorMessage) => {
    setMainError(errorMessage);
  }

  const submitRegister = (e) => {
    e.preventDefault();
    setMainError("");
    setErrors({email: "", username: "", password: ""});

    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;

    dispatch(register(inputs, navigate, handleRegisterError));
  }

  useEffect(() => {
    if (isLogin) navigate("/");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main>
      <div className={classes.title_container}>
        Online Quiz
      </div>
      <div className={classes.form_container}>
        <div className={classes.container}>
          <div className={classes.top_content}>
            <h1>Let&rsquo;s Get Started</h1>
            <form onSubmit={submitRegister}>
              <div className={classes.input}>
                <div className={classes.label}>
                  <label htmlFor="email">Email</label>
                  {errors.email && (
                    <p className={classes.error}>
                      <FormattedMessage id={errors.email} />
                    </p>
                  )}
                </div>
                <input 
                  type="text" name="email" id="email" value={inputs.email} onChange={handleInputChange} 
                  placeholder='e.g. stephenking@lorem.com'  
                />
              </div>
              <div className={classes.input}>
                <div className={classes.label}>
                  <label htmlFor="username">Username</label>
                  {errors.username && (
                    <p className={classes.error}>
                      <FormattedMessage id={errors.username} />
                    </p>
                  )}
                </div>
                <input 
                  type="text" name="username" id="username" value={inputs.username} onChange={handleInputChange} 
                  placeholder='e.g. stephen_king'  
                />
              </div>
              <div className={classes.input}>
                <div className={classes.label}>
                  <label htmlFor="password">
                    Password
                  </label>
                  {errors.password && (
                    <p className={classes.error}>
                      <FormattedMessage id={errors.password} />
                    </p>
                  )}
                </div>
                <FormControl  variant="outlined">
                  {/* eslint-disable-next-line react/self-closing-comp */}
                  <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    name="password"
                    value={inputs.password}
                    onChange={handleInputChange}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label=""
                  />
                </FormControl>
              </div>
              {/* error message */}
              {mainError && (<p className={classes.error}>{mainError}</p>)}
              <Button type="submit" variant="contained" className={classes.btn}>Register</Button>
            </form>
          </div>

          <div className={classes.bottom_content}>
            Already have an account? <a href='/login'>Login here</a>
          </div>
        </div>
      </div>
    </main>
  )
}

Register.propTypes = {
  isLogin: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
  isLogin: selectLogin,
});

export default connect(mapStateToProps)(Register);