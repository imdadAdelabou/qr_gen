const qrcodeForContactSchema = {
  schema: {
    body: {
      type: "object",
      properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        cellPhone: { type: "string" },
      },
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
  },
};

module.exports = qrcodeForContactSchema;
