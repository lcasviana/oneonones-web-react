import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { teal } from '@mui/material/colors';
import React from 'react';
import ReactDom from 'react-dom/client';
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

const container = document.getElementById('root');
const root = ReactDom.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);