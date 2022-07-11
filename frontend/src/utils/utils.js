export const BASE_URL = 'https://api.gabealena.students.nomoredomains.xyz';

export function getToken() {
    return localStorage.getItem('token');
}