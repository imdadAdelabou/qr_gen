require("dotenv").config();
const fastify = require("fastify")({ logger: true });
fastify.register(require("./plugins/dbconnector"));
fastify.register(require("./plugins/routes"));

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
};

start();
