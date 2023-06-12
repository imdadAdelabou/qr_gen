const fastifyPlugin = require("fastify-plugin");
const sequelizeFastify = require("sequelize-fastify");
const { Client } = require("fastify-sequelizejs");

async function dbconnector(fastify, opts, done) {
  await fastify.register(Client, {
    dialect: "mysql",
    database: "qrGen",
    username: "imdad",
    password: "avatarimdad96",
  });
  done();
}

module.exports = fastifyPlugin(dbconnector);
