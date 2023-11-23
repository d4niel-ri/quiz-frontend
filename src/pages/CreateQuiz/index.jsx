/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';

import { FormattedMessage } from 'react-intl';
import { Button } from '@mui/material';
import Back from '@components/Back';
import { createQuiz } from './actions';

import classes from "./style.module.scss";

const CreateQuiz = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    title: "", description: "",
  });

  const [errors, setErrors] = useState({
    title: "", description: ""
  })

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const validateTitle = () => {
    if (!inputs.title) {
      setErrors((prev) => ({...prev, title: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateDescription = () => {
    if (!inputs.description) {
      setErrors((prev) => ({...prev, description: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    const isValidatedTitle = validateTitle();
    const isValidatedDescription = validateDescription();

    if (!isValidatedTitle || !isValidatedDescription) return false;

    return true;
  }

  const submitQuiz = (e) => {
    e.preventDefault();
    setErrors({title: "", description: ""});

    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;

    dispatch(createQuiz(token, inputs, navigate));
  }

  const handleClickBack = () => {
    navigate("/activity");
  }

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(false);
  }, [])

  if (hasMounted) return null;

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <header>
          <Back handleClick={handleClickBack} />
        </header>
        <h1>Create Quiz</h1>
        <form onSubmit={submitQuiz}>
          <div className={classes.input}>
            <div className={classes.label}>
              <label htmlFor="title">Title</label>
              {errors.title && (
                <p className={classes.error}>
                  <FormattedMessage id={errors.title} />
                </p>
              )}
            </div>
            <input 
              type="text" name="title" id="title" value={inputs.title} onChange={handleInputChange} 
              placeholder='Enter title of the quiz' autoComplete='off'
            />
          </div>
          <div className={classes.input}>
            <div className={classes.label}>
              <label htmlFor="description">Description</label>
              {errors.description && (
                <p className={classes.error}>
                  <FormattedMessage id={errors.description} />
                </p>
              )}
            </div>
            <textarea 
              type="text" name="description" id="description" value={inputs.description} onChange={handleInputChange} 
              rows={3} placeholder='Enter description of the quiz'
            />
          </div>

          <Button type="submit" variant="contained" className={classes.btn}>Create Quiz</Button>
        </form>
      </div>
    </main>
  )
};

CreateQuiz.propTypes = {
  token: PropTypes.string,
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
})

export default connect(mapStateToProps)(CreateQuiz);
