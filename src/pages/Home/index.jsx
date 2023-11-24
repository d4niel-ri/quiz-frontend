/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { ping } from '@containers/App/actions';

import { selectToken } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import defaultImage from '@static/images/bg-sidebar-desktop.svg';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { getQuizzes } from './actions';
import { selectQuizzes } from './selectors';

import classes from "./style.module.scss";

const Home = ({ token, quizzes }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    dispatch(ping());
    dispatch(getQuizzes(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!hasMounted) return null;

  return (
    <main className={classes.main}>
      <div className={classes.container}>
        <h1><FormattedMessage id='app_available_quizzes' /> </h1>
        <div className={classes.quizzes}>
          {quizzes.map((quiz) => (
            <div key={quiz.id} className={classes.card} onClick={() => navigate(`/detail/${quiz.id}`)}>
              <div className={classes.card_image}>
                <img src={defaultImage} alt='' />
              </div>
              <div className={classes.card_desc}>
                <div className={classes.title}>
                  {quiz.title}
                </div>
                <div className={classes.qs_count}>
                  {quiz.questionCount} Qs
                </div>
              </div>
            </div>
          ))}  
        </div>
      </div>  
    </main>
  );
};

Home.propTypes = {
  token: PropTypes.string,
  quizzes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  quizzes: selectQuizzes,
});

export default connect(mapStateToProps)(Home);