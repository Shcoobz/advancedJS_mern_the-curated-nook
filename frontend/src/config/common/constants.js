export const API = {
  credentials: 'include',
  HEADER: {
    name: 'authorization',
    getAuthScheme: (token) => `Bearer ${token}`,
  },
  AUTH: {
    sliceName: 'auth',
  },
  CACHE_KEY: {
    usersList: 'usersList',
    booksList: 'booksList',
  },
};

export const PATH = {
  nested: '/*',
  root: '/',
  login: 'login',
  backstage: 'backstage',
  books: 'books',
  users: 'users',
  tonies: 'tonies',
  lego: 'lego',
};

export const LINK = {
  login: '/login',
  bsRoot: '/backstage',
  placeholder: '/placeholder',
  AUTH: {
    baseUrl: '/auth',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  USER: {
    users: '/users',
    viewUsers: '/backstage/users',
  },
  BOOK: {
    books: '/books',
    viewBooks: '/backstage/books',
  },
  TONIE: {
    tonies: '/tonies',
    viewTonies: '/backstage/tonies',
  },
  LEGO: {
    lego: '/lego',
    viewLego: '/backstage/lego',
  },
};

export const DATE = {
  locale: 'de-AT',
  dateStyle: 'full',
  timeStyle: 'long',
};

export const REGEX = {
  removePeriodSpace: /\.\s/g,
  checkUsername: /^[A-z]{3,20}$/,
  checkPassword: /^[A-z0-9!@#$%]{4,12}$/,
};

export const DEFAULT = {
  emptyString: '',
  emptyArray: [],
  singleSpace: ' ',
  bookTicket: '${book.ticket}',
  comma: ',',
  commaSpace: ', ',
  notAvailable: 'N/A',
};

export const ROLE = {
  user: 'User',
  superuser: 'Superuser',
  admin: 'Admin',
};

export const HTTP_STATUS = {
  ERROR: {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    conflict: 409,
    SERVER: {
      internal: 500,
    },
  },
  SUCCESS: {
    ok: 200,
    created: 201,
    noContent: 204,
  },
};

export const HTTP_METHOD = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
};

export const TAG_TYPE = {
  types: ['User', 'Book', 'Tonie', 'Lego'],
  USER: {
    type: 'User',
    id: 'LIST',
  },
  BOOK: {
    type: 'Book',
    id: 'LIST',
  },
  TONIE: {
    type: 'Tonie',
    id: 'LIST',
  },
  LEGO: {
    type: 'Lego',
    id: 'LIST',
  },
};

export const TABLE = {
  TITLE: {
    USER: {
      name: 'Username',
      roles: 'Roles',
      action: 'Edit',
    },
  },
};

export const CLASS_NAME = {
  errMsg: 'errmsg',
  offscreen: 'offscreen',
  formIncomplete: 'form__input--incomplete',
};
