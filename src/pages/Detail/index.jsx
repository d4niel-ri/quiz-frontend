/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { selectQuiz } from './selectors';
import { getQuiz } from './actions';

import classes from "./style.module.scss";

const Detail = ({ user, token, quiz }) => {
  const {quiz_id} = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(quiz, "<< QUIZ");

  useEffect(() => {
    dispatch(getQuiz(token, quiz_id));
  }, []);

  if (!quiz) return null;

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <div className={classes.quiz}>
          <div className={classes.left}>
            <div className={classes.title}>{quiz.title}</div>
            <div className={classes.description}>{quiz.description}</div>
            <div className={classes.visible}>
              <VisibilityIcon /> {quiz.is_published ? "Public" : "Draft"}
            </div>
          </div>

          {user.id === quiz.author_id && (
            <Button variant='contained' onClick={() => navigate(`/edit-quiz/${quiz.id}`)}>
              Edit Your Quiz
            </Button>
          )}
        </div>
      </div>  
    </main>
  )
}

Detail.propTypes = {
  user: PropTypes.object,
  token: PropTypes.string.isRequired,
  quiz: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  token: selectToken,
  quiz: selectQuiz,
})

export default connect(mapStateToProps)(Detail);
