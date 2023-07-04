const cors = require("@fastify/cors");
const fp = require("fastify-plugin");

async function corsConfig(fastify, opts, done) {
  await fastify.register(cors, { origin: "*" });
  done();
}

module.exports = fp(corsConfig);
