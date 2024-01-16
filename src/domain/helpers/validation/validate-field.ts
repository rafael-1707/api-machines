import { MissingParamError } from '@/domain/errors/missing-param-error';

export const validateField = (value: any, fieldName: string): void => {
  if (!value) {
    throw new MissingParamError(fieldName);
  }
};
