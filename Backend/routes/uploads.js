const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require('dotenv');
 
dotenv.config({path: "C:/Users/Admin/Desktop/TnP_USICT/Backend/config.env"});

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
});

console.log("ACESSSSSSSSSSSSS: ", process.env.ACCESS_KEY_ID, process.env.SECRET_ACCESS_KEY);

async function getObjectUrl(key){
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME, 
        Key: key
    });

    const url = await getSignedUrl(s3Client, command);
    return url;
}

async function generatePutObjectUrl(filename, contentType){
    const command = new PutObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: `uploads/${filename}`,
        ContentType: contentType
    })

    const url = await getSignedUrl(s3Client, command);
    return url;
}

async function getFile(){
    console.log("URL for Image: ", await getObjectUrl("uploads/company/TEST_COMPANY/test@company.com/016_AtmaNirbhar_Bharat_History.pdf"));
}
// async function putFile(){
//     console.log("Put file: ", await putObject(`PDF-${Date.now()}.pdf`, "application/pdf"));
// }
// getFile();
// putFile();

module.exports = {getObjectUrl, generatePutObjectUrl};