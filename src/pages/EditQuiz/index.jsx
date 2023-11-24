/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '@components/Back';
import EditIcon from '@mui/icons-material/Edit';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { Button } from '@mui/material';
import { getQuiz } from '@pages/EditQuiz/actions';
import { selectQuestions, selectQuiz } from '@pages/EditQuiz/selectors';

import EditQuizDialog from './components/EditQuizDialog';
import QuestionCard from './components/QuestionCard';

import classes from "./style.module.scss";

const EditQuiz = ({ user, token, quiz, questions }) => {
  const { quiz_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [allow, setAllow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleClickBack = () => {
    navigate("/activity");
  }

  console.log(quiz, "<< QUIZ");
  console.log(questions, "<< QUESTIONS");

  useEffect(() => {
    dispatch(getQuiz(user, token, quiz_id, setAllow, navigate));
  }, [])

  if (!allow) return null;

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <header>
          <Back handleClick={handleClickBack} />
        </header>
        <h1>Edit Quiz</h1>
        <div className={classes.content}>
          <div className={classes.quiz} onClick={handleClickOpen}>
            <div className={classes.left}>
              <div className={classes.title}>{quiz.title}</div>
              <div className={classes.description}>{quiz.description}</div>
              <div className={classes.visible}>
                <VisibilityIcon /> {quiz.is_published ? "Public" : "Draft"}
              </div>
            </div>
            <EditIcon className={classes.edit_icon} />
          </div>
          <h2>Edit Questions</h2>
          <div className={classes.questions}>
            {questions.map((question) => 
              <QuestionCard key={question.id} question={question} dispatch={dispatch} token={token} />
            )}
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.buttons}>
            <Button 
              variant='contained' className={classes.btn} 
              onClick={() => navigate(`/create-question/${quiz.id}/${questions.length + 1}`)}
            >
              Create Question
            </Button>
          </div>
        </div>
      </div>

      <EditQuizDialog open={open} handleClose={handleClose} quiz={quiz} token={token} />
    </main>
  )
}

EditQuiz.propTypes = {
  token: PropTypes.string,
  user: PropTypes.object,
  quiz: PropTypes.object,
  questions: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectUser,
  quiz: selectQuiz,
  questions: selectQuestions,
})

export default connect(mapStateToProps)(EditQuiz);
