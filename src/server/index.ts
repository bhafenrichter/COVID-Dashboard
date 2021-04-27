import express, { Router } from 'express';
import bodyParser from 'body-parser';
import { api } from './route/routes/index';

import { Cache } from './middlewares/cache';
import path from 'path';

import compression from 'compression';

import { initJobs } from './jobs/scheduler';

// call express
const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST or PUT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port: number = Number(process.env.PORT) || 3001; // set our port

app.use(compression());
/*
STATIC CONTENT
  serve static content via gzip compression relies
  on compression-webpack-plugin creates a .gz clone of
  the file that gets unzipped and served to the user
*/
app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'application/javascript');
  next();
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile('/dist/index.html');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
const routes: Router[] = Object.values(api);
app.use('/api', Cache);
app.use('/api', routes);

// START THE SERVER
app.listen(port);
console.log(`App listening on ${port}!`);

// INITIALIZE JOBS
initJobs();
