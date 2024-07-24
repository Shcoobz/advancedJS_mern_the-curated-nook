export const SERVER = {
  LOG: {
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
  NOT_FOUND: '404 Not found',
};
