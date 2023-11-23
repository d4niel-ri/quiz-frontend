/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import classes from './style.module.scss';

const Back = ({ handleClick }) => {
  return (
    <Button variant='contained' className={classes.btn} onClick={handleClick}>
      <KeyboardArrowLeftIcon /> <div><FormattedMessage id="app_back" /></div>
    </Button>
  )
}

Back.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default Back;
