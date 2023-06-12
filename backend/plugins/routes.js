const {
  loginSchema,
  registerSchema,
  verifySchema,
} = require("../schemas/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sampleTemplate } = require("../template/sendVerifyCode");
const sendMail = require("./sendgrid");
const verifyToken = require("../controllers/verifyToken");

function routes(fastify, opt, done) {
  const DB = fastify.Sequelize["qrGen"];
  DB.DefineModel("Users", {
    username: DB.Schema.STRING,
    email: DB.Schema.STRING,
    password: DB.Schema.STRING,
    isVerify: DB.Schema.BOOLEAN,
  });
  const Users = DB.Models.Users;

  fastify.get("/", async (request, reply) => {
    return reply.status(200).send({ message: "Welcome to the qr_gen backend" });
  });

  fastify.route({
    method: "POST",
    url: "/login",
    schema: loginSchema,
    handler: (request, reply) => {
      return reply.status(200).send({ message: "User correctly login" });
    },
  });

  fastify.route({
    method: "POST",
    url: "/register",
    schema: registerSchema,
    handler: async (request, reply) => {
      const { username, email, password } = request.body;
      const userAlreadyExist = await Users.findOne({ where: { email } });

      if (userAlreadyExist) {
        return reply.status(409).send({ message: "User already exit" });
      }
      const result = await Users.create({
        username: request.body["username"].toLowerCase(),
        email: request.body["email"].toLowerCase(),
        password: "",
        isVerify: false,
      });
      const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.SALT)
      );
      await Users.update({ password: passwordHash }, { where: { email } });
      const token = jwt.sign(
        { userId: result.id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "2h" }
      );
      sendMail({
        recipient: email,
        subject: "Verification link",
        html: sampleTemplate(token),
      });

      return { message: "User correctly register" };
    },
  });

  fastify.route({
    method: "GET",
    url: "/confirm-email",
    schema: verifySchema,
    preHandler: verifyToken,
    handler: async (request, reply) => {
      const userId = request.params.userId;

      try {
        await Users.update({ isVerify: true }, { where: { id: userId } });
        return reply.status(200).send({ message: "Account succesful verify" });
      } catch (e) {
        return reply.status(500).send({ message: "Internal Server Error" });
      }
    },
  });

  done();
}

module.exports = routes;
