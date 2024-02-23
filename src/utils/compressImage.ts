import sharp from 'sharp';
import fs from 'fs/promises'

async function compressImage (fileName: string): Promise<void> {
  const path = `${process.env.ROOT_PATH}/media/profile/${fileName}`
  const compressFile = await fs.readFile(path)
  const result = await sharp(compressFile)
    .resize(200, 200, {fit: 'outside'})
    .toFile(path)
}

export default compressImage
