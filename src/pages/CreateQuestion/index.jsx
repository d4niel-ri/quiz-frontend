/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import classes from "./style.module.scss";
import { createQuestion } from './actions';

export const CreateQuestion = ({ token }) => {
  const { quiz_id, question_no } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [question_text, setQuestion_Text] = useState("");
  const [answers, setAnswers] = useState([
    {choice: "A", text: "", isCorrect: false},
    {choice: "B", text: "", isCorrect: false},
    {choice: "C", text: "", isCorrect: false},
    {choice: "D", text: "", isCorrect: false},
  ]);
  const [errors, setErrors] = useState({
    question_text: "", answers: ""
  });

  const validateQuestion_Text = () => {
    if (!question_text) {
      setErrors((prev) => ({...prev, question_text: "app_error_required"}));
      return false;
    }

    return true;
  }

  const validateAnswers = () => {
    if (answers.some(answer => answer.text.trim() === "")) {
      setErrors((prev) => ({...prev, answers: "All answer must not empty"}));
      return false;
    }

    if (!answers.some(answer => answer.isCorrect)) {
      setErrors((prev) => ({...prev, answers: "At least one answer is correct"}));
      return false;
    }

    return true;
  }

  const validateInputs = () => {
    const isValidatedQuestion_Text = validateQuestion_Text();
    const isValidatedAnswers = validateAnswers();

    if (!isValidatedQuestion_Text || !isValidatedAnswers) return false;

    return true;
  }

  const handleSave = () => {
    setErrors({question_text: "", answers: ""});

    // eslint-disable-next-line no-useless-return
    if (!validateInputs()) return;

    const inputs = {};
    inputs.question_no = question_no;
    inputs.question_text = question_text;
    inputs.answers = answers;

    dispatch(createQuestion(token, quiz_id, inputs, navigate));
  }

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1>Create Question</h1>
        <form>
          <section>
            <div className={classes.label}>
              <label htmlFor='question_text'>Question Text</label>
              {errors.question_text && (
                <p className={classes.error}>{errors.question_text}</p>
              )}
            </div>
            <textarea 
              type="text" name="question_text" id="question_text" value={question_text} 
              onChange={(e) => setQuestion_Text(e.target.value)} 
              rows={3} placeholder='Enter text of the question'
            />
          </section>
          <section>
            <div className={classes.label}>
              <label>Answers</label>
              {errors.answers && (
                <p className={classes.error}>{errors.answers}</p>
              )}
            </div>
            <div className={classes.answers}>
              {/* Choice A */}
              <div className={classes.answer}>
                <input 
                  type="text" value={answers[0].text}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[0].text = e.target.value;
                    setAnswers(newAnswers);
                  }} 
                />
                <div className={classes.is_correct}>
                  <input 
                    type="checkbox" 
                    checked={answers[0].isCorrect}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[0].isCorrect = e.target.checked;
                      setAnswers(newAnswers);
                    }}
                  />
                  <label>Mark this option as correct</label>
                </div>
              </div>

              {/* Choice B */}
              <div className={classes.answer}>
                <input 
                  type="text" value={answers[1].text}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[1].text = e.target.value;
                    setAnswers(newAnswers);
                  }} 
                />
                <div className={classes.is_correct}>
                  <input 
                    type="checkbox" 
                    checked={answers[1].isCorrect}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[1].isCorrect = e.target.checked;
                      setAnswers(newAnswers);
                    }}
                  />
                  <label>Mark this option as correct</label>
                </div>
              </div>

              {/* Choice C */}
              <div className={classes.answer}>
                <input 
                  type="text" value={answers[2].text}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[2].text = e.target.value;
                    setAnswers(newAnswers);
                  }} 
                />
                <div className={classes.is_correct}>
                  <input 
                    type="checkbox" 
                    checked={answers[2].isCorrect}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[2].isCorrect = e.target.checked;
                      setAnswers(newAnswers);
                    }}
                  />
                  <label>Mark this option as correct</label>
                </div>
              </div>

              {/* Choice D */}
              <div className={classes.answer}>
                <input 
                  type="text" value={answers[3].text}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[3].text = e.target.value;
                    setAnswers(newAnswers);
                  }} 
                />
                <div className={classes.is_correct}>
                  <input 
                    type="checkbox" 
                    checked={answers[3].isCorrect}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[3].isCorrect = e.target.checked;
                      setAnswers(newAnswers);
                    }}
                  />
                  <label>Mark this option as correct</label>
                </div>
              </div>
            </div>
          </section>
        </form>
        <div className={classes.buttons}>
          <Button variant='contained' onClick={() => navigate(`/edit-quiz/${quiz_id}`)}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save Question
          </Button>
        </div>
      </div>
    </main>
  )
};

CreateQuestion.propTypes = {
  token: PropTypes.string.isRequired,
}

const mapStateToProps = createStructuredSelector({
  token: selectToken,
})

export default connect(mapStateToProps)(CreateQuestion);