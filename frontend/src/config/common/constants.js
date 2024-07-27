export const API = {
  credentials: 'include',
  HEADER: {
    name: 'authorization',
    getAuthScheme: (token) => `Bearer ${token}`,
  },
  AUTH: {
    sliceName: 'auth',
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
  bsViewBooks: '/backstage/books',
  bsViewUsers: '/backstage/users',
  bsViewTonies: '/backstage/tonies',
  bsViewLego: '/backstage/lego',
  AUTH: {
    baseUrl: '/auth',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  },
  USER: {
    users: '/users',
  },
};

export const DATE = {
  locale: 'de-AT',
  dateStyle: 'full',
  timeStyle: 'long',
};

export const REGEX = {
  removePeriodSpace: /\.\s/g,
};

export const REPLACEMENT = {
  emptyString: '',
  emptyArray: [],
  singleSpace: ' ',
  noteTicket: '${note.ticket}',
  comma: ',',
  commaSpace: ', ',
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
};
