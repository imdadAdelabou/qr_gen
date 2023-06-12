const fastifyPlugin = require("fastify-plugin");

async function mariadbconnector(fastify, options, done) {
  await fastify.register(require("fastify-mariadb"), {
    promise: true,
    connectionString: "mariadb://imdad:avatarimdad96@localhost/qrGen",
  });

  done();
}

module.exports = fastifyPlugin(mariadbconnector);
