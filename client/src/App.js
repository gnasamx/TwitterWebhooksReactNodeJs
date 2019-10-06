import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home1 from './pages/Home1';
// import {PrivateRoute} from './pages/PrivateRoute';
import {Login} from './pages/Login';
import TwitterAuthProvider from './contexts/auth-context';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <TwitterAuthProvider>
          <Route exact path="/" component={Home1} />
          <Route exact path="/login" component={Login} />
        </TwitterAuthProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
