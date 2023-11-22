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

import { login } from '@containers/Client/actions';
import { selectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Login = ({ isLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState({
    email: "", password: "",
  });

  const [errors, setErrors] = useState({
    email: "", password: ""
  });

  const [mainError, setMainError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

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

    return true;
  }

  const validatePassword = () => {
    if (!inputs.password) {
      setErrors((prev) => ({...prev, password: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    const isValidatedEmail = validateEmail();
    const isValidatedPassword = validatePassword();

    if (!isValidatedEmail || !isValidatedPassword)
      return false;

    return true;
  }

  const handleLoginInvalid = () => {
    setInputs({email: "", password: ""});
    setMainError("Username or password is invalid");
  }

  const submitLogin = (e) => {
    e.preventDefault();
    setMainError("");
    setErrors({email: "", password: ""});
    
    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;

    dispatch(login(inputs, navigate, handleLoginInvalid));
  }

  useEffect(() => {
    if (isLogin) navigate("/");
    setHasMounted(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMounted) return null;

  return (
    <main>
      <div className={classes.title_container}>
        Online Quiz
      </div>
      <div className={classes.form_container}>
        <div className={classes.container}>
          <div className={classes.top_content}>
            <h1>Let&rsquo;s Get Started</h1>
            <form onSubmit={submitLogin}>
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
              {mainError && (<p className={classes.error}>Username or password is invalid</p>)}
              <Button type="submit" variant="contained" className={classes.btn}>Login</Button>
            </form>
          </div>

          <div className={classes.bottom_content}>
            New to Online Quiz? <a href='/register'>Signup here</a>
          </div>
        </div>
      </div>
    </main>
  )
};

Login.propTypes = {
  isLogin: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  isLogin: selectLogin,
});

export default connect(mapStateToProps)(Login);