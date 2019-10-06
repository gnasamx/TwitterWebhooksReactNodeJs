import React from 'react';
import {Route} from 'react-router-dom';
import {useTwitterAuthContext} from '../contexts/auth-context';
import {Login} from './Login';

export const PrivateRoute = ({component, ...rest}) => {
  const {user} = useTwitterAuthContext();

  console.log('context returns; ', useTwitterAuthContext());
  console.log('in private route', user);
  const showComponent = user ? component : Login;
  return <Route {...rest} component={showComponent} />;
};
