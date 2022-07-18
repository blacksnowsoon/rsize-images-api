import supertest from "supertest";
import app from "../index";
import  {
  image,
  validateTheEntries,
  generatImageName,
  isFileExsistInFull,
  isFileExsistInThumb,
  createNewImage,
}  from "../routes/imgapi/resizeimg";

// declare the request object from the app
const request = supertest(app);
describe('Test endpoints response', ()=>{
  // check the root app endpoint
  it('gets the / endpoint response as app home page', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  // check the api end point
  it('get the /api endpoint for the routes', async () =>{
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });
  // suite of the main api functions of resizing
  describe('get the image resizing route', ()=>{
    // check the image response with query
    it('checks the image query response' , async ()=>{
      const response = await request.get('/api/image?title=fjord&width=400&height=200');
      expect(response.status).toBe(200)
    })

    //check validating entries
    it('is all requierd entries are right as name, width, height', ()=>{
      const checker = validateTheEntries({name:"santamonica", width: "200", height: "200"});
      expect(checker).toBeTruthy()
    });
    // check if the dimensions are less than 20
    it('expect false for dimensions less than 20',()=>{
      const check = validateTheEntries({name: "santa", width: "15", height: "20"});
      expect(check).toBeFalsy();
    });
    // check generate a file name with the dimensions concatenat
    it('concatenat the dimensions with the file name', ()=>{
      const generatedFile = generatImageName({name: "fjord", width: "600", height: "400"});
      expect(generatedFile).toBe("fjord_600_400");
    });
    // check if the file exsit in full dir 
    it('get an [name, extension] for the exsit file in full dir', async ()=>{
      const nameArr = await isFileExsistInFull('fjord');
      expect(nameArr).toContain("fjord");
    });
    // check if the file exsit in thumb dir
    it('get an [name, extension] for the exsit file in thumb dir', async ()=>{
      const nameArr = await isFileExsistInThumb('fjord_200_200');
      expect(nameArr).toContain("fjord_200_200");
    });
    // check if the sharp package is working--
    it('get the return from async fun with sharp ', async ()=>{
      const newFile = await createNewImage(["fjord", ".jpg"], "fjord", 200, 200);
      expect(newFile).toEqual(["fjord", ".jpg"]);
    })
  });// end of the resizing image suite api

});// end of the main suite
