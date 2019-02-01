import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as consola from 'consola';
import { Nuxt, Builder } from 'nuxt';
const app = express();
const host: string = process.env.HOST || '127.0.0.1';
let port: number;
if (process.env.PORT) {
  port = parseInt(process.env.PORT);
} else {
  port = 3000;
}

app.set('port', port);

// Import and Set Nuxt.js options
import * as config from '../nuxt.config.js';
config.dev = !(process.env.NODE_ENV === 'production');

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  }

  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  // app.use(bodyParser.json());

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
