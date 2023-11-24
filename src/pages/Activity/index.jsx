/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';

import { selectLoading } from '@containers/App/selectors';
import defaultImage from '@static/images/bg-sidebar-desktop.svg';
import { selectQuizzes } from './selectors';
import { getCompletedQuizzes, getCreatedQuizzes } from './actions';

import classes from "./style.module.scss";

export const Activity = ({ loading, token, quizzes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [navChosen, setNavChosen] = useState("Completed");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [])

  useEffect(() => {
    if (navChosen === "Completed") {
      dispatch(getCompletedQuizzes(token));
    } else {
      dispatch(getCreatedQuizzes(token));
    }
  }, [navChosen]);

  if (!hasMounted) return null;

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <header>
          <h1>Activity</h1>
          <Button variant='contained' className={classes.btn} onClick={() => navigate("/create-quiz")}>
            Create a quiz
          </Button>
        </header>
        <nav>
          <div 
            className={`${navChosen === "Completed" ? classes.chosen : ""}`} 
            onClick={() => setNavChosen("Completed")}
          >
            Completed
          </div>
          <div
            className={`${navChosen === "Created" ? classes.chosen : ""}`} 
            onClick={() => setNavChosen("Created")}
          >
            Created
          </div>
        </nav>

        {!loading && (
          <div className={classes.content}>
            {navChosen === "Completed" ? (
              <div className={classes.quizzes}>
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className={classes.card} onClick={() => navigate(`/detail/${quiz.id}`)}>
                    <div className={classes.card_image}>
                      <img src={defaultImage} alt='' />
                      <div className={classes.labels}>
                        <div>{quiz.questionCount} Qs</div>
                      </div>
                    </div>
                    <div className={classes.card_desc}>
                      <div className={classes.title}>
                        {quiz.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              ) : (
              <div className={classes.quizzes}>
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className={classes.card} onClick={() => navigate(`/detail/${quiz.id}`)}>
                    <div className={classes.card_image}>
                      <img src={defaultImage} alt='' />
                      <div className={classes.labels}>
                        <div>{quiz.questionCount} Qs</div>
                        <div>{quiz.is_published ? "Public" : "Draft"}</div>
                      </div>
                    </div>
                    <div className={classes.card_desc}>
                      <div className={classes.title}>
                        {quiz.title}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )
            }
          </div>
        )}
        
      </div>
    </main>
  )
};

Activity.propTypes = {
  loading: PropTypes.bool.isRequired,
  token: PropTypes.string,
  quizzes: PropTypes.array,
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading,
  token: selectToken,
  quizzes: selectQuizzes,
})

export default connect(mapStateToProps)(Activity);
