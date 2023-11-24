/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { IconButton } from '@mui/material';
import { deleteQuestion } from '@pages/EditQuiz/actions';
import classes from "./style.module.scss";

const QuestionCard = ({ question, dispatch, token }) => {
  const answers = JSON.parse(question.answers);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteQuestion(token, question.id));
  }

  return (
    <div className={classes.card}>
      <header>
        <div className={classes.left_header}>
          {question.question_no}
        </div>
        <div className={classes.right_header}>
          <IconButton className={classes.edit_icon}>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.delete_icon} onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </header>
      <div className={classes.text}>
        {question.question_text}
      </div>
      <hr />
      <div className={classes.answers}>
        {answers.map((answer) => (
          <div key={answer.choice} className={classes.answer}>
            {answer.isCorrect === "true" ? 
              <CheckIcon className={classes.correct} /> : 
              <ClearIcon className={classes.wrong} />
            }
            <div className={classes.text}>
              {answer.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

QuestionCard.propTypes = {
  question: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default QuestionCard;

