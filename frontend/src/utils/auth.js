export const BASE_URL = "https://auth.nomoreparties.co/";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function _request(endpoint, { method, headers = {}, body } = {}) {
  const options = {
    method,
    headers: { ...defaultHeaders, ...headers },
    ...(body && { body: JSON.stringify(body) }),
  };

  return fetch(BASE_URL + endpoint, options).then(_getResponseData);
}

function _getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getContent = (jwt) => {
  return _request("users/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const register = (password, email) => {
  return _request("signup", {
    method: "POST",
    body: { password, email },
  });
};

export const authorize = (password, email) => {
  return _request("signin", {
    method: "POST",
    body: { password, email },
  });
};
