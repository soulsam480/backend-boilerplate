import { SwaggerRouter } from 'koa-swagger-decorator';

const protectedRouter = new SwaggerRouter({ prefix: '/api/v1' });

// Swagger endpoint
protectedRouter.swagger({
  title: 'Backend boilerplate',
  description: 'Backend boilerplate',
  version: '0.0.0',
  prefix: '/api/v1',
  swaggerOptions: {
    securityDefinitions: {
      api_key: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

// dump swagger json
protectedRouter.dumpSwaggerJson({
  filename: 'swagger.json',
  dir: process.cwd(),
});

export { protectedRouter };
