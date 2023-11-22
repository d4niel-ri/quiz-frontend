import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectLocale, selectTheme } from '@containers/App/selectors';

import Navbar from '@components/Navbar';
import { selectLogin, selectUser } from '@containers/Client/selectors';

const MainLayout = ({ children, isLogin, user, locale, theme, intl: { formatMessage } }) => (
  <div>
    <Navbar
      isLogin={isLogin}
      user={user}
      title={formatMessage({ id: 'app_title_header' })}
      locale={locale}
      theme={theme}
    />
    {children}
  </div>
);

const mapStateToProps = createStructuredSelector({
  isLogin: selectLogin,
  user: selectUser,
  locale: selectLocale,
  theme: selectTheme,
});

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object,
  locale: PropTypes.string,
  theme: PropTypes.string,
  intl: PropTypes.object,
};

export default injectIntl(connect(mapStateToProps)(MainLayout));
