import { InvalidParamError } from '@/domain/errors/invalid-param-error';

export const validateFieldLength = (paramName: string, param: string, minLength: number, maxLength: number): void => {
  if (String(param).length < minLength || String(param).length > maxLength) {
    throw new InvalidParamError(`${paramName} must be between ${minLength} and ${maxLength} characters`);
  }
};
