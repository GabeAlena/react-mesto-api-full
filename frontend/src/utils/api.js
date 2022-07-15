import { getToken, BASE_URL } from "./utils";

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    }
    
    // загрузка информации о пользователе с сервера
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    }

    //загрузка карточек с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    };

    //редактирование профиля
    editProfileData(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._checkResponse)
    };

    //добавление новой карточки
    postNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(this._checkResponse)
    };

    //отображение количества лайков карточки
    getLikes() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    };

    //удаление карточки
    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    };

    //постановка и снятие лайка
    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
            credentials: 'include'
        })
        .then(this._checkResponse)
    };

    //обновление аватара пользователя
    patchAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                avatar
            })
        })
        .then(this._checkResponse)
    };
}

export const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        'Authorization': `${getToken()}`,
        'Content-Type': 'application/json'
    },
});
