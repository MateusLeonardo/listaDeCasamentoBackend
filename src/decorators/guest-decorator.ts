import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Guest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.user.guestId !== null) {
      return request.user.guestId;
    }

    throw new BadRequestException('Guest ID não encontrado');
  },
);
