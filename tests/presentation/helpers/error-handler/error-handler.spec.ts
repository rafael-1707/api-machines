import { NotFoundError } from '@/application/errors';
import { MissingParamError, InvalidParamError } from '@/domain/errors/';
import { errorHandler } from '@/presentation/helpers/error-handler/error-handler';
import { badRequest, notFound } from '@/presentation/helpers/http/http-helper';

describe('errorHandler', () => {
  test('Should return 400 if error is a MissingParamError', () => {
    const error = new MissingParamError('any_field');
    const response = errorHandler[(error as Error).name](error);
    expect(response).toMatchObject(badRequest(error));
    expect(response).toEqual(badRequest(error));
  });

  test('Should return 400 if error is a InvalidParamError', () => {
    const error = new InvalidParamError('any_field');
    const response = errorHandler[(error as Error).name](error);
    expect(response).toMatchObject(badRequest(error));
    expect(response).toEqual(badRequest(error));
  });

  test('Should return 404 if error is a NotFoundError', () => {
    const error = new NotFoundError('any_field');
    const response = errorHandler[(error as Error).name](error);
    expect(response).toMatchObject(notFound(error));
    expect(response).toEqual(notFound(error));
  });
});
