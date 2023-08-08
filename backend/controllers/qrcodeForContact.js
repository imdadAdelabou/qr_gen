const vCard = require("vcard-generator");
const qrcode = require("qrcode");

async function qrCodeForContact(fastify, user, req, res) {
  try {
    const { firstName, lastName, cellPhone, email } = req.body;
    const vcard = vCard.generate({
      name: {
        familyName: lastName[0].toUpperCase() + lastName.slice(1),
        givenName: firstName[0].toUpperCase() + firstName.slice(1),
      },
      emails: [{ text: email }],
      phones: [
        {
          text: cellPhone,
        },
      ],
    });
    const vcardText = vcard.toString();
    const qrCode = await qrcode.toDataURL(vcardText);

    return res.status(200).send({
      message: "Success",
      data: { typeQr: "contact", date: Date(), url: qrCode },
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
}

module.exports = qrCodeForContact;
