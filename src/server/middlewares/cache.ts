import express, { NextFunction } from 'express';
import mcache from 'memory-cache';

var app = express();
export const Cache = express.Router();

// only respond to requests that are asking for json
const bodyParser = require('body-parser');
Cache.use(bodyParser.json());

const CACHE_TIMEOUT = 1800000;

// gets called for every request
Cache.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if (req.method === 'GET') {
    let key = '_cache_' + req.originalUrl || req.url;
    let cachedResponse = mcache.get(key);

    if (cachedResponse) {
      // send the cached response
      res.send(cachedResponse);
      return;
    }

    // @ts-ignore
    res.sendResponse = res.send;
    // @ts-ignore
    res.send = (body) => {
      // @ts-ignore
      if (!res.badResponse) {
        // cache the response, and send it
        mcache.put(key, body, CACHE_TIMEOUT);
      }
      // @ts-ignore
      res.sendResponse(body);
    };
  }
  next();
});
