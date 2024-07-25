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
  CORS: {
    NOT_ALLOWED: 'Not allowed by CORS!',
  },
};

export const USER = {
  ERROR: {
    NOT_FOUND: 'No users found!',
    ALL_FIELDS_REQUIRED: 'All fields are required!',
    DUPLICATE_USERNAME: 'Duplicate username!',
    INVALID_DATA: 'Invalid user data received!',
    FIELDS_REQUIRED: 'All fields except password are required!',
    ID_REQUIRED: 'User ID Required!',
  },
  SUCCESS: {
    CREATED: (username) => `New user ${username} created!`,
    UPDATED: (username) => `${username} updated!`,
    DELETED: (username, userId) => `Username ${username} with ID ${userId} deleted!`,
  },
};

export const BCRYPT = {
  SALT_ROUNDS: 10,
};
