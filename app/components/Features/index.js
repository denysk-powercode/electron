import * as React from 'react';
import { withTranslation } from 'react-i18next';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Features = ({ t }) => (
  <>
    <h2>{t('features')}</h2>
    <Wrapper>
      <Item hot>Webpack 4</Item>
      <Item hot>Babel 7</Item>
      <Item hot>ESLint 5</Item>
      <Item hot>Flow Type</Item>
      <Item hot>Jest 24</Item>
      <Item react>React 16.x (latest), with Hooks!</Item>
      <Item>React Router 5</Item>
      <Item>Redux (+ Thunk)</Item>
      <Item>Immer</Item>
      <Item>Reselect</Item>
      <Item>React Helmet</Item>
      <Item>Express Webserver + Server Side Rendering</Item>
      <Item>{t('i18n-support')}</Item>
      <Item>CSS Modules</Item>
      <Item>PostCSS</Item>
      <Item>Prettier (incl. precommit-hook via lint-staged + husky)</Item>
      <Item>Hot Module Reloading (HMR)</Item>
    </Wrapper>
  </>
);

const Wrapper = styled.ul`
  padding: 0;
`;

const Item = styled.li`
  list-style: none;
  padding: 4px 0;

  ::before {
    display: inline-block;
    content: ${(props) => {
      let icon = `'✅'`;
      if (props.hot) icon = `'🔥'`;
      if (props.react) icon = `'⚛'`;
      return icon;
    }};
    min-width: 28px;
    text-align: center;
  }
`;

Features.propTypes = {
  t: propTypes.func.isRequired,
};

export default withTranslation()(Features);
