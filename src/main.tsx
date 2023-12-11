import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App.tsx';
import './index.css';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './ThemeProvider/ThemeProvider.tsx';
import ErrorMessage from './Components/ErrorMessage/ErrorMessage.tsx';
import { CssBaseline } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorMessage />}>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
