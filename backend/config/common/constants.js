export const DEFAULT = {
  ORIGINS: ['http://localhost:3000'],
  HOST: 'http://localhost',
  EMPTY_ARRAY: [],
  EMPTY_STRING: '',
  WISHLIST: false,
  BOOK: {
    NO_DESCRIPTION: 'Leider keine Beschreibung verfügbar :(',
    LANGUAGE: 'de',
  },
};

export const REGEX = {
  HOMEPAGE_ROUTE: '^/$|/index(.html)?',
};

export const DELIMITER = {
  COMMA: ',',
};

export const BCRYPT = {
  SALT_ROUNDS: 10,
};

export const FILE = {
  MAIN_HTML: 'index.html',
  ERROR_404: '404.html',
  REQ_LOG: 'reqLog.log',
  ERR_LOG: 'errLog.log',
  MONGO_ERR_LOG: 'mongoErrLog.log',
};

export const ROUTE = {
  ROOT: '/',
  WILDCARD: '*',
  STATIC: {
    PUBLIC: '../../public',
    VIEWS: '../../views',
    LOGS: '../../logs',
    LOCAL_HOST: '',
  },
};

export const ENDPOINT = {
  ROOT: '/',
  USERS: '/users',
  BOOKS: '/books',
  LEGO: '/lego',
  TONIES: '/tonies',
};

export const CONTENT_TYPE = {
  HTML: 'html',
  JSON: 'json',
  TEXT: 'txt',
};

export const HTTP_STATUS = {
  ERROR: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER: {
      INTERNAL: 500,
    },
  },
  SUCCESS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
  },
};

export const INDEX = {
  NO_MATCH: -1,
  EMPTY_ARRAY: 0,
};

export const MONGO_EVENTS = {
  OPEN: 'open',
  ERROR: 'error',
  DISCONNECTED: 'disconnected',
  RECONNECTED: 'reconnected',
};

export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
};

export const LOCALE_SETTINGS = {
  DEFAULT_LOCALE: 'de_AT',
  DEFAULT_STRENGTH: 2,
};
