import { createParamDecorator } from '@nestjs/common';

export const GetSupplieId = createParamDecorator((data, req): string => {
  const id = req.args[0].id;
  return id;
});
