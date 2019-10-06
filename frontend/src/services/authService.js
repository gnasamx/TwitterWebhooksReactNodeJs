import fetch from 'cross-fetch';

/** Login user */
export function initaiateTwitterLoginService() {
  window.location.href = 'https://f4e5c5b6.ngrok.io/auth/twitter';
}

export function loginService() {
  const requestOptions = {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  };

  // check request has user
  return fetch(
    'https://f4e5c5b6.ngrok.io/auth/login/success',
    requestOptions,
  ).then(handleResponse);
}

export function logoutService() {
  const requestOptions = {
    method: 'GET',
    credentials: 'same',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
  };

  return fetch('https://f4e5c5b6.ngrok.io/auth/logout', requestOptions).then(
    handleResponse,
  );
}

function handleResponse(response) {
  return response.json().then(resJson => {
    const data = resJson;
    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403
    ) {
      // logout();
      // location.reload(true);
      const errorMessage = data.message;
      return Promise.reject(errorMessage);
    }

    return Promise.resolve(data);
  });
}
