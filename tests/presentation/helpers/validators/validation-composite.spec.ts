import { MissingParamError } from '@/presentation/errors/missing-param-error';
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite';
import { type IValidation } from '@/presentation/interfaces/validation';

class ValidationStub implements IValidation {
  error: Error = null;
  validate(input: any): Error {
    return this.error;
  }
}

const field = 'any_field';

type SutTypes = {
  sut: ValidationComposite;
  validationSpies: ValidationStub[];
};

const makeSut = (): SutTypes => {
  const validationSpies = [new ValidationStub(), new ValidationStub()];
  const sut = new ValidationComposite(validationSpies);
  return {
    sut,
    validationSpies,
  };
};

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[1].error = new MissingParamError(field);
    const error = sut.validate({ [field]: 'any_field' });
    expect(error).toEqual(validationSpies[1].error);
  });

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut();
    validationSpies[0].error = new Error();
    validationSpies[1].error = new MissingParamError(field);
    const error = sut.validate({ [field]: 'any_field' });
    expect(error).toEqual(validationSpies[0].error);
  });

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ [field]: 'any_field' });
    expect(error).toBeFalsy();
  });
});
