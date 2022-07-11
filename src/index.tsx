import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { teal } from '@mui/material/colors';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App/App';
import store from './Core/Redux/Store';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[600],
    },
    mode: 'dark',
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