const uploadFile = require("../plugins/s3AwsConfig").uploadFile;
async function qrCodeForFile(req, res) {
  try {
    const data = await req.file();
    if (!data) {
      return res
        .status(400)
        .json({ message: "Bad request. A file is required" });
    }

    await uploadFile(data, data.filename);

    // console.log(file);
    return res.status(200).send({ message: "Success" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
}

module.exports = qrCodeForFile;
