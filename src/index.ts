import dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';

import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import { morgan } from './middlewares/morgan';
import { protectedRouter } from './controllers';

const PORT = process.env.PORT || 3000;

function main() {
  const app = new Koa();

  // Provides important security headers to make your app more secure
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          'cdnjs.cloudflare.com',
          'fonts.googleapis.com',
        ],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: [
          "'self'",
          'data:',
          'online.swagger.io',
          'validator.swagger.io',
        ],
      },
    }),
  );

  // Enable cors with default options
  app.use(cors());

  // Enable bodyParser with default options
  app.use(bodyParser());

  //logger
  app.use(morgan());

  app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

main();
