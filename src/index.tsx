import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import React from 'react';
import ReactDom from 'react-dom';
import { App } from './App/App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    type: 'dark',
  },
});

ReactDom.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);