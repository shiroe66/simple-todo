import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(ctx: ExecutionContext) {
    const result = (await super.canActivate(ctx)) as boolean;
    const request = ctx.switchToHttp().getRequest<Request>();

    await super.logIn(request);
    return result;
  }
}
