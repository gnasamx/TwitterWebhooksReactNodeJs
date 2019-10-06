import React, {createContext, useState, useEffect, useContext} from 'react';

export const TwitterAuthContext = createContext(null);

const TwitterAuthProvider = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      fetch('https://arcane-spire-93028.herokuapp.com/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then(response => {
          if (response.status === 200) return response.json();
          console.log(new Error('failed to authenticate user'));
        })
        .then(responseJson => {
          setUser(responseJson.user);
        })
        .catch(error => {
          console.log('Failed to authenticate user:', error);
        });
    }
  }, [user]);

  const onLogin = () => {
    fetch('https://arcane-spire-93028.herokuapp.com/auth/twitter', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    });
  };

  const authUserValue = {user, onLogin};

  return <TwitterAuthContext.Provider value={authUserValue} {...props} />;
};

export const useTwitterAuthContext = () => useContext(TwitterAuthContext);

export default TwitterAuthProvider;
