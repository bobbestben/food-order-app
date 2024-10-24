import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";
export async function POST(req) {
  const data = await req.formData()
  console.log("@@@@ Data here")
  console.log(data)
  if (data.get('file')) {
    console.log("@@@ Upload file happening")
    const file = data.get('file');
    const s3Client = new S3Client({
      region: 'ap-southeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      }
    })
    const ext = file.name.split('.').slice(-1)[0];
    const newFilename = uniqid() + '.' + ext;
    
    const chunks = []
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    const bucket = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION;
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFilename,
      ACL: 'public-read',
      ContentType: file.type,
      Body: buffer,
    }))
    const link = 'https://'+bucket+'.s3.'+region+'.amazonaws.com/'
    +newFilename
    console.log("upload file complete, link: " + link)
    return Response.json(link);
  }
  console.log("@@@ Upload file end")
  return Response.json(true);
}