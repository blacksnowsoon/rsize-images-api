 # Resizing Images API 

 ## Table of content
 * [overview]
 * [instructions]
 * [dependencies]



 ## Overbiew
 the api convert the images to prefferd size it has 2 folders in the assets folder /full and /thumb by adding the photo in the full folder and reach the url with quering a new image as below

 ../api/imag?title=imagename&width=preffers width&height=prefferd height
 a new image will be generated and showing in the browser with the new dimensions

 note: 
 that the minimum width is 20 and minimum height is 20

 ## Instructions
 by cloning this project -- in the cli just write npm install will install all the dependencies
 it need for the project
 * npm run prettier will syle the code
 * npm run start will start a localhost in dev mode
 * npm run jasmine will start the test on the dist folder
 * npm run build will build the app create a dist folder and compile the code move the necessary files and folder from the src to dist
 * npm run clean will delete the dist folder


 ## dependencies
 the main dependencies for that project are:
 
 * express as a server build
 * jasmine for testing environment
 * sharp as a package for converting the images
  
