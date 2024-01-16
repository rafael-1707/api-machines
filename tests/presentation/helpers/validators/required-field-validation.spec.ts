import { MissingParamError } from '@/presentation/errors/missing-param-error';
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation';

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field');
};

describe('RequiredFieldValidation', () => {
  test('Should return undefined if validation succeeds', () => {
    const sut = makeSut();
    const result = sut.validate({ field: 'any_value' });
    expect(result).toBeUndefined();
  });

  test('Should return MissingParamError if validation fails', () => {
    const sut = makeSut();
    const input = { field: '' };
    const result = sut.validate(input);
    expect(result).toEqual(new MissingParamError('field'));
  });
});
