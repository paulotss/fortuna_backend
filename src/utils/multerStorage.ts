import multer from 'multer'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, `${process.env.ROOT_PATH || '/app'}/media/profile`)
  },
  filename: (_req, file, cb) => {
    const type = file.mimetype.split('/')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + type[1]
    cb(null, uniqueSuffix)
  }
})

const multerStorage = multer({ storage })

export default multerStorage
