// the main APIs route index exprot all nedded routes through calling the index_r

import express, { Router } from 'express';
import { image } from './imgapi/resizeimg';

const routes: Router = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
  res.send(`{image?title={imageName}&width={200}&height={200}}`);
});

routes.use('/', image);

export default routes;
