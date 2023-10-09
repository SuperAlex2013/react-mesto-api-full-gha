class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, options) {
    const url = `${this._baseUrl}${endpoint}`;
    const fullOptions = {
      headers: this._headers,
      ...options
    };

    return fetch(url, fullOptions).then(this._getResponseData);
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return this._request("/cards", { method: "GET" });
  }

  getDataUser() {
    return this._request("/users/me", { method: "GET" });
  }

  saveDataInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  saveCardInfo({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, { method: "DELETE" });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return this._request(`/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
    });
  }

  saveDataProfile({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}

const api = new Api({
  baseUrl: "https://api.ulra.nomoredomainsrocks.ru",
  HEADERS: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
