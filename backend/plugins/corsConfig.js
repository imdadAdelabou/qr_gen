const cors = require("@fastify/cors");
const fp = require("fastify-plugin");

async function corsConfig(fastify, opts, done) {
  await fastify.register(cors, { origin: process.env.BASE_FRONT_URL });
  done();
}

module.exports = fp(corsConfig);
