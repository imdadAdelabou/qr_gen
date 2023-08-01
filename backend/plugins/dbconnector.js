const fastifyPlugin = require("fastify-plugin");
const { Client } = require("fastify-sequelizejs");

async function dbconnector(fastify, opts, done) {
  await fastify.register(Client, {
    dialect: "mysql",
    database: process.env.DB_NAME_DEV,
    username: "root",
    port: 3306,
  });
  done();
}

module.exports = fastifyPlugin(dbconnector);
