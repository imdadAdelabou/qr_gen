require("dotenv").config();
const fastify = require("fastify")({ logger: true });
fastify.register(require("./plugins/dbconnector"));
fastify.register(require("./plugins/routes"));
fastify.register(require("./plugins/corsConfig"));

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
};

start();
