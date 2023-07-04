const fastifyPlugin = require("fastify-plugin");
const { Client } = require("fastify-sequelizejs");

async function dbconnector(fastify, opts, done) {
  await fastify.register(Client, {
    dialect: "mysql",
    database: "qrGen",
    username: "imdad",
    password: "avatarimdad96",
    port: 3306,
  });
  done();
}

module.exports = fastifyPlugin(dbconnector);
