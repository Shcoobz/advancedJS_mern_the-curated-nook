export const REGEX = {
  HOMEPAGE_ROUTE: '^/$|/index(.html)?',
};

export const FILE = {
  MAIN_HTML: 'index.html',
  ERROR_404: '404.html',
};

export const ROUTE = {
  ROOT: '/',
  WILDCARD: '*',
  STATIC: {
    PUBLIC: '../../public',
    VIEWS: '../../views',
  },
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
