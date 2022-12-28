export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://kodilla-annoncements.herokuapp.com/'
    : 'http://localhost:8000';
export const IMGS_URL =
  process.env.NODE_ENV === 'production' ? '/uploads/' : 'http://localhost:8000/uploads/';
