import React from 'react';
import i18next from 'i18next';
import { withRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getLocale } from '../store/app/selectors';

/* eslint-disable camelcase */
import de_DE from './locales/de_DE.json';
import en_US from './locales/en_US.json';
/* eslint-enable camelcase */

i18next.init({
  fallbackLng: 'en_US',
  fallbackNS: ['translation'],
  resources: {
    de_DE,
    en_US,
  },
  parseMissingKeyHandler: (missing) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('MISSING TRANSLATION:', missing);
    }
    return missing;
  },
});

i18next.languages = ['de_DE', 'en_US'];

class I18N extends React.PureComponent {
  componentDidMount() {
    const { locale } = this.props;
    i18next.changeLanguage(locale);
  }

  componentDidUpdate(prevProps) {
    const { locale: newLocale } = this.props;
    const { locale: oldLocale } = prevProps;

    if (oldLocale !== newLocale) {
      i18next.changeLanguage(newLocale);
    }
  }

  render() {
    const { children } = this.props;
    return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
  }
}

I18N.propTypes = {
  children: propTypes.any,
  locale: propTypes.oneOf(['en_US', 'de_DE']),
};

I18N.defaultProps = {
  children: null,
  locale: 'en_US',
};

const mapStateToProps = (state) => ({
  locale: getLocale(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
  )(I18N)
);
