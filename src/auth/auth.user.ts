import { createParamDecorator } from '@nestjs/common';

export const GetUserId = createParamDecorator((data, req): string => {
  const id = req.args[0].id;
  return id;
});
