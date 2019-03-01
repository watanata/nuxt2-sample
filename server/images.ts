import { Router } from 'express';
// import * as multer from 'multer';
import * as AWS from 'aws-sdk';
// import * as jimp from 'jimp';
// import * as exif from 'exif';
// import { parse } from 'exif-date';

const router = Router();
// const upload = multer({dest: 'uploads/'});
// TODO to be env val
const bucketName = 'img-test.homes.jp';
// const hostName = 's3-ap-northeast-1.amazonaws.com';

// router.post('/api/images', upload.array('images'), async (req, res, next) => {
  // const jimpImg = await jimp.read(req.files[0].path);
  // const name = req.files[0].originalname || req.files[0].filename;
  // const ExifImage = exif.ExifImage;
  // const exifObj = new ExifImage({image: req.files[0].path}, async (error, exifData) => {
    // if (error) {
      // console.log('error: '+error.message);
      // next(error);
    // } else {
      // const exifDate = exifData.exif.DateTimeOriginal;
      // const imageDate = parse(exifDate);

      // const resizedImg = jimpImg.resize(150, jimp.AUTO);
      // const uploadName = `${name}_thum.${resizedImg.getExtension()}`
      // // resizedImg.write(tmpPath);
      // const bf = await resizedImg.getBufferAsync(jimp.MIME_JPEG)
      // const s3 = new AWS.S3();
      // const thumbParams = {
        // Bucket: bucketName,
        // Key: `wedding/thumbs/${uploadName}`,
        // Body: bf
      // }
      // s3.upload(thumbParams, (err, data) => {
        // if (err) {
          // console.log('err: '+err.message);
        // } else {
          // console.log(data);
        // }
      // });
      // const params = {
        // Bucket: bucketName,
        // Key: `wedding/${uploadName}`,
        // Body: file
      // }
      // s3.upload(params, (err, data) => {
        // if (err) {
          // console.log('err: '+err.message);
        // } else {
          // console.log(data);
        // }
      // });
    // }
  // });
  // res.json({hoge: 'hogeeeee'});
// });

router.get('/api/images', async (req, res, next) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: bucketName,
    MaxKeys: 21,
  };
  let data;
  try{
    data = await s3.listObjectsV2(params).promise();
  } catch (err) {
    console.log(err);
  }
  let ret: string[] = [];
  if (data.Contents) {
    data.Contents.forEach(obj => {
      let url;
      if (obj.Key && (obj.Key.endsWith('jpg') || obj.Key.endsWith('JPG'))) {
        url = `https://s3-ap-northeast-1.amazonaws.com/${bucketName}/${obj.Key}`;
        ret.push(url);
      }
    });
  }
  res.json(ret);
});

export default router;
