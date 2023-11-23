/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dialog, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { updateQuiz } from '@pages/EditQuiz/actions';
import classes from "./style.module.scss";

const EditQuizDialog = ({ open, handleClose, quiz, token }) => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    title: quiz.title, description: quiz.description,
  });
  const [visibility, setVisibility] = useState(quiz.is_published ? "Public" : "Draft");

  const [errors, setErrors] = useState({
    title: "", description: ""
  });

  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const handleSave = () => {
    setErrors({title: "", description: ""});

    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;

    const formattedInputs = inputs;
    formattedInputs.is_published = visibility === "Public";
    dispatch(updateQuiz(token, quiz.id, handleClose, formattedInputs));
  }

  useEffect(() => {
    setErrors({title: "", description: ""});
    setInputs({title: quiz.title, description: quiz.description});
    setVisibility(quiz.is_published ? "Public" : "Draft");
  }, [open])

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={classes.dialog}>
        <div className={classes.content}>
          <form>
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
            <div className={classes.input}>
              <div className={classes.label}>
                <label htmlFor="visibility">Visibility</label>
              </div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={visibility}
                  label=""
                  onChange={(e) => setVisibility(e.target.value)}
                >
                   {/* eslint-disable-next-line react/jsx-boolean-value */}
                  <MenuItem value="Public">Public</MenuItem>
                  <MenuItem value="Draft">Draft</MenuItem>
                </Select>
              </FormControl>
            </div>
          </form>
        </div>
        <div className={classes.buttons}>
          <Button variant="contained" className={classes.cancel} onClick={handleClose}>Cancel</Button>
          <Button variant='contained' className={classes.save} onClick={handleSave}>Save</Button>
        </div>
      </div>
    </Dialog>
  )
}

EditQuizDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
}

export default EditQuizDialog;