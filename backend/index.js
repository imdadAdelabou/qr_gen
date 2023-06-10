const { loginSchema, registerSchema } = require("./schemas/auth.js");
const { loginHandler, registerHandler } = require("./controllers/auth.js");

const fastify = require("fastify")({ logger: true });

fastify.get("/", async (request, reply) => {
  return reply.status(200).send({ message: "Welcome to the qr_gen backend" });
});

fastify.route({
  method: "POST",
  url: "/login",
  schema: loginSchema,
  handler: loginHandler,
});

fastify.route({
  method: "POST",
  url: "/register",
  schema: registerSchema,
  handler: registerHandler,
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (e) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
