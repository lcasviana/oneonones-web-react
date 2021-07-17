import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App/App';
import store from './Core/Redux/Store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    type: 'dark',
  },
});

ReactDom.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);