import { badRequest, notFound } from '@/presentation/helpers/http/http-helper';
import { type IHttpResponse } from '@/presentation/interfaces/http';

export const errorHandler: { [key: string]: (error: Error) => IHttpResponse } = {
  InvalidParamError: (error: Error) => badRequest(error),
  MissingParamError: (error: Error) => badRequest(error),
  NotFoundError: (error: Error) => notFound(error),
};
