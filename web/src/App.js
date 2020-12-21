import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import { PersistGate } from 'redux-persist/integration/react';

import theme from './theme';
import { configureStore } from './store';
import routes from './routes';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';
import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
// import './mock';
import './assets/scss/index.scss';

const history = createBrowserHistory();
const store = configureStore().store;
const persist = configureStore().persist;

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router history={history}>
              <ScrollReset />
              <GoogleAnalytics />
              <CookiesNotification />
              {renderRoutes(routes)}
            </Router>
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
