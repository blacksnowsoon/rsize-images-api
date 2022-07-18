import express, { Application } from 'express';
import routes from './routes/routes';

// the app const
const app: Application = express();
// the port value
const port: number = 3000;

// set the server endpoing
app.get('/', (req: express.Request, res: express.Response) => {
  res.send(
    `ADD {/api} to the address bar`
  );
});

// set the image endpoint
app.use('/api', routes);

// start the server listener
app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});

export default app;
