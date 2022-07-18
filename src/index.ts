import express from 'express';
import routes from './routes/routes';

// the app const
const app = express();
// the port value
const port = 3000;

// set the server endpoing
app.get('/', (req, res) => {
  res.send(
    `<h1 style = "text-align: center; font-size:5em;">home page of the app <br>ADD {/api} to the address bar </h1>`
  );
});

// set the image endpoint
app.use('/api', routes);

// start the server listener
app.listen(port, () => {
  console.log(`server is working on http://localhost:${port}`);
});

export default app;
