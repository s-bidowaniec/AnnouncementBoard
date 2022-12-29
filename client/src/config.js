export const API_URL =
  process.env.NODE_ENV === 'production' ? `${window.location.origin}` : 'http://localhost:8000';
export const IMGS_URL =
  process.env.NODE_ENV === 'production'
    ? `${window.location.origin}/uploads/`
    : 'http://localhost:8000/uploads/';
