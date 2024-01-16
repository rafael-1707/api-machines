import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite';
import { type IValidation } from '@/presentation/interfaces';

export const makeCreateMachineValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of [
    'categoryId',
    'model',
    'brand',
    'hours',
    'year',
    'description',
    'responsibleSalesPersonId',
    'imagesId',
  ]) {
    validations.push(new RequiredFieldValidation(field));
  }

  return new ValidationComposite(validations);
};
