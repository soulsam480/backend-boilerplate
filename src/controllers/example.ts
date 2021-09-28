import { BaseContext } from 'koa';
import {
  description,
  prefix,
  query,
  request,
  responses,
  summary,
} from 'koa-swagger-decorator';

class User {
  name: string;
}

@prefix('')
export default class GeneralController {
  @request('get', '/')
  @summary('Welcome page')
  @description('welcome')
  public static async helloWorld(ctx: BaseContext): Promise<void> {
    ctx.body = 'Hello World!';
  }

  @request('get', '/name')
  @summary('name page')
  @description('print my name')
  @query({ name: { type: 'string', required: true, description: 'Your name' } })
  @responses({ 200: { description: 'success' }, 400: { description: 'error' } })
  public static async getName(ctx: BaseContext) {
    const name = ctx.query.name;

    const user = new User();

    user.name = name as string;
    ctx.body = user;
  }
}
