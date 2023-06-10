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
};

module.exports = { loginSchema, registerSchema };
