const { fastify } = require("fastify");


function controllers(fastify, opt, done) {
  return {
    loginHandler: () => {
      
    }
  };
}

async function loginHandler(request, reply) {
  const mariadb = fastify.mariadb;
  const connection = await mariadb.getConnection();

  const result = await mariadb.query("SELECT username FROM users WHERE id=?", [
    0,
  ]);
  connection.release();

  return { hello: result[0] };
}

async function registerHandler(request, reply) {
  return { hello: "register" };
}

module.exports = { loginHandler, registerHandler, controllers };
