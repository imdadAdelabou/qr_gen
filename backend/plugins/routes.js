const {
  loginSchema,
  registerSchema,
  verifySchema,
  generateQrSchema,
} = require("../schemas/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sampleTemplate } = require("../template/sendVerifyCode");
const sendMail = require("./sendgrid");
const verifyToken = require("../controllers/verifyToken");
const qrCodeForContact = require("../controllers/qrcodeForContact");
const qrCodeForFileCtrl = require("../controllers/qrcodeForFile");
const qrCodeForContactSchema = require("../schemas/qrcodeForContact.schema");
const qrCodeForFileSchema = require("../schemas/qrcodeForFile.schema");
const qr = require("qrcode");

function routes(fastify, opt, done) {
  const DB = fastify.Sequelize[process.env.DB_NAME_DEV];
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
    url: "/api/login",
    schema: loginSchema,
    handler: async (request, reply) => {
      const { email, password } = request.body;
      try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
          return reply.status(404).send({ message: "User don't exit" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return reply.status(400).send({
            message: "Invalid Credientials",
            errCode: "wrong-password",
          });
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "2h" }
        );

        return reply.status(200).send({
          message: "User correctly login",
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            token: token,
          },
        });
      } catch (e) {
        return reply.status(500).send({ message: "Internal server error" });
      }
    },
  });

  fastify.route({
    method: "POST",
    url: "/api/register",
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
    url: "/api/confirm-email",
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

  fastify.route({
    method: "POST",
    url: "/api/generate/qr/link",
    schema: generateQrSchema,
    handler: async (request, reply) => {
      try {
        const url = await qr.toDataURL(request.body.link);

        return reply.status(200).send({
          message: "success",
          data: { url: url, typeQr: "link", date: Date() },
        });
      } catch (e) {
        return reply.status(500).send({ message: "Internal Error" });
      }
    },
  });

  fastify.post("/api/generate/qr/file", qrCodeForFileSchema, async (req, res) =>
    qrCodeForFileCtrl(req, res)
  );

  fastify.post("/api/generate/qr/contact", qrCodeForContactSchema, (req, res) =>
    qrCodeForContact(fastify, Users, req, res)
  );

  done();
}

module.exports = routes;
