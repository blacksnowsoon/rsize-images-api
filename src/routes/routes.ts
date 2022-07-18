// the main APIs route index exprot all nedded routes through calling the index_r

import express from 'express';
import { image } from './imgapi/resizeimg';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send(
    `<h1 style = "text-align: center; font-size:3em;">APIs page main route of routes ADD<br> {image?title={imageName}&width={200}&height={200}} to the address bar</h1>`
  );
});

routes.use('/', image);

export default routes;
