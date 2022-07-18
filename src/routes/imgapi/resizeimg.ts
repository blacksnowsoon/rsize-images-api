import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

//  assign a route for the image
const image = express.Router();

// declare a golbal var for the pathes of inout and output
const fullDir = path.resolve(__dirname, '../../assets/full'); // full images dir
const thumbDir = path.resolve(__dirname, '../../assets/thumb'); // resized images dir

// declear the 404 page path as an error sending
const errorPage = path.resolve(__dirname, './../../404.html');

// set the end point to the image and handle the request
image.get('/image', async (req, res) => {
  const getImage = await getTheImage(req);

  if (getImage.length == 2) {
    res.sendFile(thumbDir + '/' + getImage.join(''));
  } else {
    res.sendFile(errorPage);
  }
});

// get the image from the thunmb folder if not redirect to generate a new image
async function getTheImage(req: express.Request): Promise<string[]> {
  let generatedFile: string[] = [];
  const imgInfo = {
    name: req.query.title as string,
    width: req.query.width as string,
    height: req.query.height as string,
  };
  // validate the entries
  if (validateTheEntries(imgInfo)) {
    // generate the image name templet
    const requestedImage = generatImageName(imgInfo); // get the tepmlete name wich incloude the dimensions
    // check if the image exist 
    const fromThumb = await isFileExist(requestedImage, thumbDir);
    const fromFull = await isFileExist(imgInfo.name, fullDir);

    if (fromThumb.length != 0) {
      return fromThumb;
    } else if(fromFull.length != 0){
      generatedFile = await createNewImage(
        fromFull,
        requestedImage,
        Number.parseInt(imgInfo.width),
        Number.parseInt(imgInfo.height)
      );
    }
  } // end if the enteries has any undefined value
  else {
    return ['something wrong with url enteries? loading error page'];
  }
  return generatedFile;
} // end of get the requested image

// validate the entries and size must be at least 20x20
function validateTheEntries(imgInfo: {
  name: string;
  width: string;
  height: string;
}): boolean {
  if (
    imgInfo.name == undefined &&
    imgInfo.width == undefined &&
    imgInfo.height == undefined
  )
    return false;
  return (
    imgInfo.name.length != 0 &&
    Number.parseInt(imgInfo.width) >= 20 &&
    Number.parseInt(imgInfo.height) >= 20
  );
}// end of validate entries

// generate image name to match the size of the image
function generatImageName(imgInfo: {
  name: string;
  width: string;
  height: string;
}): string {
  return imgInfo.name + '_' + imgInfo.width + '_' + imgInfo.height;
}// end of generatImageName

// check if the file exsit in the thumb folder then return the file
async function isFileExist(fileName: string, dir: string): Promise<string[]> {
  let file: string[] = [];
  try {
    (await fs.promises.readdir(dir)).map((value: string): void => {
      if (value.substring(0, value.lastIndexOf('.')) === fileName) {
        file.push(value.substring(0, value.lastIndexOf('.')));
        file.push(value.substring(value.lastIndexOf('.'), value.length));
      }
    });

    return file;
  } catch (err) {
    console.log(err);
    return [];
  }
}// end of isFileExist

// create a new image
async function createNewImage(
  inputImage: string[],
  outputImage: string,
  width: number,
  height: number
): Promise<string[]> {
  return new Promise((resolve) => {
    try {
      sharp(fullDir + '/' + inputImage.join(''))
        .resize({ width: width, height: height })
        .toFile(thumbDir + '/' + outputImage + inputImage[1], (err) => {
          if (err) console.log(err);
          resolve([outputImage, inputImage[1]]);
        });
    } catch (err) {
      return [];
    }
  });
}// end of createNewImage

export {
  image,
  generatImageName,
  isFileExist,
  createNewImage,
  validateTheEntries,
  fullDir,
  thumbDir
};