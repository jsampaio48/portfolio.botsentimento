// config.js
export const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? process.env.RENDER_EXTERNAL_URL || window.location.origin
    : 'http://localhost:3000'
};