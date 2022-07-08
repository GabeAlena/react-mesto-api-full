/* export const BASE_URL = 'https://api.gabealena.students.nomoredomains.xyz'; */
export const BASE_URL = 'https://auth.nomoreparties.co';

export function getToken() {
    return localStorage.getItem('jwt');
}