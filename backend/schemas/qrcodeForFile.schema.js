const qrcodeForFileSchema = {
  schema: {
    response: {
      500: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      400: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
};

module.exports = qrcodeForFileSchema;
