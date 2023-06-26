const fastifyPlugin = require("fastify-plugin");
const sequelizeFastify = require("sequelize-fastify");
const { Client } = require("fastify-sequelizejs");

async function dbconnector(fastify, opts, done) {
  await fastify.register(Client, {
    dialect: "mariadb",
    database: "qrGen",
    username: "folley",
    password: "password",
    host: "192.168.64.118",
    port: 3306,
  });
  done();
}

module.exports = fastifyPlugin(dbconnector);
