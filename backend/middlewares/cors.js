const { NODE_ENV, ALLOWED_CORS_PRODUCTION } = process.env;
const ALLOWED_CORS = NODE_ENV === 'production' ? ALLOWED_CORS_PRODUCTION.split(', ') : ['https://ulra.nomoredomainsrocks.ru', 'http://ulra.nomoredomainsrocks.ru', '127.0.0.1:3000'];

const CORS_OPTIONS = {
  credentials: true,
  origin: ALLOWED_CORS,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  CORS_OPTIONS,
};
