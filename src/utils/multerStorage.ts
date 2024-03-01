import { extname } from 'path';
import multerS3 from 'multer-s3'
import multer from 'multer'
import { S3Client } from '@aws-sdk/client-s3'

// const storage = multer.diskStorage({
//   destination: (_req, _file, cb) => {
//     cb(null, `${process.env.ROOT_PATH || '/app'}/media/profile`)
//   },
//   filename: (_req, file, cb) => {
//     const type = file.mimetype.split('/')
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + type[1]
//     cb(null, uniqueSuffix)
//   }
// })

const storage = multerS3({
  s3: new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
    }
  }),
  bucket: process.env.BUCKET_NAME || 'fortuna-bucket',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: "public-read",
  key: (_req, file, cb) => {
    const key = Date.now() + extname(file.originalname);
    file.filename = key;
    cb(null, key);
  },
})

const multerStorage = multer({ storage })

export default multerStorage
