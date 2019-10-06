import React from 'react';
// import {useTwitterAuthContext} from '../contexts/auth-context';

export const Login = () => {
  // const {onLogin} = useTwitterAuthContext();

  return (
    <div>
      {/* <button onClick={onLogin}>Login with twitter</button> */}
      <a href="https://arcane-spire-93028.herokuapp.com/auth/twitter">
        Login with twitter
      </a>
    </div>
  );
};
