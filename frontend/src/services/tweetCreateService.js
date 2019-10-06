import fetch from 'cross-fetch';

export function createTweetEventService(event) {
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(event),
  };

  // check request has user
  return fetch(
    'https://f4e5c5b6.ngrok.io/event/tweet/create/new',
    requestOptions,
  ).then(handleResponse);
}

export function getAllTweetEvents() {
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
    'https://f4e5c5b6.ngrok.io/event/tweet/all',
    requestOptions,
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.json().then(resJson => {
    const data = resJson;
    if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403
    ) {
      const errorMessage = data.message;
      return Promise.reject(errorMessage);
    }

    return Promise.resolve(data);
  });
}
