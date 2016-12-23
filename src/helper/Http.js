import { BackendUrl } from 'Config';
const axios = require('axios');
const store = require('store');
axios.defaults.headers.common['Authorization'] = `Bearer ${store.get('token') || ''}`;
export function reloadAuthorizationHeader(){
  axios.defaults.headers.common['Authorization'] = `Bearer ${store.get('token') || ''}`;
}
export function setAuthorizationHeader(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default axios;
