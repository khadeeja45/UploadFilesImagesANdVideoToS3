import AWS from "aws-sdk";


export async function UploadToS3(bucketName, filePath, content) {

  AWS.config.update({
    accessKeyId: process.env.S3_accessKeyId,
    secretAccessKey: process.env.S3_secretAccessKey,
    region: "us-east-1"
  });

  // console.log(bucketName, filePath, content)
  let s3 = new AWS.S3({ params: { Bucket: bucketName } });
  let result = 0;
  let ImageBase64 = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  let data = {
    Key: filePath,
    Body: ImageBase64,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };

  result = await s3.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
      return false;
    } else {
      console.log('successfully uploaded the image!');
      return true;
    }
  }).promise();
  return result;
}

export async function UploadVideoToS3(bucketName, filePath, content) {

  AWS.config.update({
    accessKeyId: process.env.S3_accessKeyId,
    secretAccessKey: process.env.S3_secretAccessKey,
    region: "us-east-1"
  });


  let s3 = new AWS.S3({ params: { Bucket: bucketName } });
  let result = 0;
  let ImageBase64 = Buffer.from(content.replace(/^data:video\/\w+;base64,/, ""), 'base64');
  let data = {
    Key: filePath,
    Body: ImageBase64,
    ContentEncoding: 'base64',
    ContentType: 'video/mp4'
  };

  result = await s3.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
      return false;
    } else {
      console.log('successfully uploaded the video!');
      return true;
    }
  }).promise();
  return result;
}


export async function UploadFileToS3(bucketName, path, contents) {
  AWS.config.update({
    accessKeyId: Your Access Key,
    secretAccessKey: Secret Access key,
    region: "us-east-1"
  });
  const params = {
    Bucket: bucketName,
    Key: path, // 'path/to/your/file.tflite',
    Body: contents,
    // ACL: 'public-read-write' // Set the ACL as per your requirement
  };

  let s3 = new AWS.S3({ params: { Bucket: bucketName } });
  

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("err ", err)
        reject(err);
      } else {
        console.log("data ", data)
        resolve(data.Location); // Returns the URL of the uploaded file
      }
    });
  });
}