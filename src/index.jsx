import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import requestErrorHandler from './utils/requestErrorHandler';
import store from './redux/store/index';
import App from './App';
import './styles/constants.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: requestErrorHandler,
  }),
});

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>,
);
