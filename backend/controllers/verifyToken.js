const jwt = require("jsonwebtoken");

async function verifyToken(request, reply, done) {
  try {
    const decoded = jwt.verify(
      request.query.token,
      process.env.TOKEN_SECRET_KEY
    );

    request.params.userId = decoded.userId;
  } catch (e) {
    return reply.status(401).send({ message: "Invalid Token" });
  }
  done();
}

module.exports = verifyToken;
