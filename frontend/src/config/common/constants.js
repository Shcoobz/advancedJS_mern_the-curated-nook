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
  bsViewBooks: '/backstage/books',
  bsViewUsers: '/backstage/users',
  bsViewTonies: '/backstage/tonies',
  bsViewLego: '/backstage/lego',
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
