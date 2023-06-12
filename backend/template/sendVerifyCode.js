function sampleTemplate(token) {
  console.log(`${process.env.BASE_FRONT_URL}/verify-email?token=${token}`);
  return `<h1>Hello,</h1><br/> Here is your confirmation link ${process.env.BASE_FRONT_URL}/verify-email?token=${token}.<br />Thank you.`;
}

module.exports = { sampleTemplate };
