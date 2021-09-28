import { Middleware } from 'koa';
import OMorgan, { Options } from 'morgan';

export function morgan(
  format = ':method :url :status :res[content-length] - :response-time ms',
  options?: Options<any, any>,
): Middleware {
  const fn = OMorgan(format, options);
  return (ctx, next) => {
    return new Promise((resolve, reject) => {
      fn(ctx.req, ctx.res, (err) => {
        err ? reject(err) : resolve(ctx);
      });
    }).then(next);
  };
}
