const loginSchema = {
  body: {
    type: "object",
    properties: {
      email: {
        type: "string",
        minLength: 1,
      },
      password: {
        type: "string",
        minLength: 6,
      },
    },
    required: ["email", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        user: {
          id: { type: "number" },
          username: { type: "string" },
          email: { type: "string" },
          token: { type: "string" },
        },
      },
    },
    400: {
      type: "object",
      properties: {
        message: { type: "string" },
        errCode: { type: "string" },
      },
    },
    404: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },

    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const registerSchema = {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
        minLength: 3,
      },
      email: {
        type: "string",
        minLength: 1,
      },
      password: {
        type: "string",
        minLength: 6,
      },
    },
    required: ["username", "email", "password"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    409: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const verifySchema = {
  querystring: {
    type: "object",
    properties: {
      token: {
        type: "string",
      },
    },
    required: ["token"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

const generateQrSchema = {
  body: {
    type: "object",
    properties: {
      link: { type: "string", minLength: 1 },
    },
    required: ["link"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
        data: {
          url: { type: "string" },
          typeQr: { type: "string" },
          date: { type: "date" },
        },
      },
    },
    500: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};

module.exports = {
  loginSchema,
  registerSchema,
  verifySchema,
  generateQrSchema,
};
