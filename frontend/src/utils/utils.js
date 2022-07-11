export const BASE_URL = 'http://api.gabealena.students.nomoredomains.xyz';

export function getToken() {
    return localStorage.getItem('token');
}