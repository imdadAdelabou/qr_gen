async function loginHandler(request, reply) {
  return { hello: "world" };
}

async function registerHandler(request, reply) {
    return { hello: "register" };
  }

module.exports = { loginHandler, registerHandler };
