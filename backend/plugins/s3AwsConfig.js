const AWS = require("aws-sdk");
const S3AWS = require("@aws-sdk/client-s3");

const s3 = new S3AWS.S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const uploadFile = async (file, keyName) => {
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
  });
  const s3AWS = new AWS.S3();
  const bufferFile = await file.toBuffer();
  const uploadParams = new S3AWS.PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: keyName,
    Body: bufferFile,
    ContentType: file.mimetype,
  });

  try {
    await s3.send(uploadParams);
    const url = s3AWS.getSignedUrl("getObject", {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: keyName,
      Expires: 60 * 5,
    });

    return url;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

module.exports = {
  uploadFile: uploadFile,
};
