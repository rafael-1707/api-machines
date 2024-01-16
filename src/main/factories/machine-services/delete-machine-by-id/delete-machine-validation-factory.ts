import { ValidationComposite, RequiredFieldValidation } from '@/presentation/helpers/validators/';
import { type IValidation } from '@/presentation/interfaces';

export const makeDeleteMachineValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
