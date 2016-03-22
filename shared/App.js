import React, { PropTypes } from 'react';
import NavBar from './layouts/NavBar/NavBar';
import Footer from './layouts/Footer/Footer';

import themeDecorator from 'material-ui/lib/styles/theme-decorator';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

// footer height
const spaceStyle = {
  paddingBottom: '3em',
};

function App(props) {
  return (
    <div>
      <NavBar />
      { props.children }
      <div style={spaceStyle}></div>
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default themeDecorator(getMuiTheme(null, { userAgent: 'all' }))(App);
