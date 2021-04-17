import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import RouteWithSubRoutes from './RouteWithSubRoutes';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const User = lazy(() => import('pages/users/Users'));

const routes = [
  {
    path: '/',
    component: User,
  },
];

const AppRouter = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Suspense fallback={<div className="lazy-loading">Loading...</div>}>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Suspense>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default AppRouter;
