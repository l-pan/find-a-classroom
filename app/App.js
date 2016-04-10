import React, { PropTypes } from 'react';
import NavBar from './layouts/NavBar/NavBar';
import Footer from './layouts/Footer/Footer';

import rawTheme from './theme';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';

const muiTheme = getMuiTheme(rawTheme, { userAgent: 'all' });

// footer height
const spaceStyle = {
  paddingBottom: '3em',
};

function App(props) {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <NavBar />
        { props.children }
        <div style={spaceStyle}></div>
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
