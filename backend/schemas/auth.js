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

module.exports = { loginSchema, registerSchema, verifySchema };
