import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const authorization = ctx.switchToHttp().getRequest().headers.authorization;

    if (!authorization) {
      return null;
    }

    const [, token] = authorization.split(' ');
    return token;
  },
);
