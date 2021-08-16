export const API_URL = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000/api';
export const audience = (process.env.NODE_ENV === 'production') ? 'https://still-stream-70087.herokuapp.com/' : 'http://localhost:8000';
export const AUTH0_URL = 'https://dev-ms59jlua.eu.auth0.com/api/v2/';
