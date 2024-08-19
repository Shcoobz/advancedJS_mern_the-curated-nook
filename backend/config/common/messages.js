export const SERVER = {
  NOT_FOUND: '404 Not found',
  MONGO: {
    START: (PORT, LOCAL_URL) => `
  ========================================
  🚀 Connected to MongoDB!
  ----------------------------------------
  🌐 Server running on port ${PORT}.
  
  🔗 Visit: ${LOCAL_URL}
  ========================================
`,
    DISCONNECTED: `
  ========================================
  ❌ MongoDB Disconnected!
  ========================================
`,
    RECONNECTED: `
  ========================================
  🔄 MongoDB Reconnected!
  ========================================
`,
  },
};

export const ERROR = {
  NOT_FOUND: (entity) => `No ${entity}(s) found!`,
  ALL_FIELDS_REQUIRED: (entity) => `All fields are required for ${entity}!`,
  DUPLICATE: (entity) => `Duplicate ${entity} found!`,
  INVALID_DATA: (entity) => `Invalid ${entity} data received!`,
  FIELDS_REQUIRED: (entity, fields) => `${fields} is required for ${entity}!`,
  ID_REQUIRED: (entity) => `${entity} ID Required!`,
  UNAUTHORIZED: 'Unauthorized',
  FORBIDDEN: 'Forbidden',
  CORS: {
    NOT_ALLOWED: 'Not allowed by CORS!',
  },
};

export const SUCCESS = {
  CREATED: (entity, name) => `${entity} "${name}" created!`,
  UPDATED: (entity, name) => `${entity} "${name}" updated!`,
  DELETED: (entity, name, id) => `${entity} "${name}" with ID ${id} deleted!`,
};

export const ENTITY = {
  USER: 'User',
  BOOK: 'Book',
  TONIE: 'Tonie',
  LEGO: 'Lego',
};

export const FIELD = {
  PASSWORD: 'PASSWORD',
  TITLE: 'TITLE',
  ISBN: 'ISBN',
  ID: 'ID',
  NAME: 'NAME',
  SET_NUMBER: 'SET_NUMBER',
};
