import { MissingParamError } from '@/presentation/errors/missing-param-error';
import { type IValidation } from '@/presentation/interfaces/validation';

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}
  validate(input: any): any {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
