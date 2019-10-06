import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import PrivateRoute from './pages/PrivateRoute';
import Login from './pages/Login';
import {store} from './store/configureStore';

function App() {
  console.log(store.getState());
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
