import { type MachineDto } from '@/domain/dto/machine-dto';
import { validateField } from '@/domain/helpers/validation/validate-field';
import { validateFieldLength } from '@/domain/helpers/validation/validate-field-length';
import { InvalidParamError } from '@/domain/errors/invalid-param-error';
import { sanitizeStringField } from '@/domain/helpers/validation/sanitize-field';

export class MachineEntity {
  categoryId: string;
  model: string;
  brand: string;
  hours: number;
  year: number;
  description: string;
  responsibleSalesPersonId: string;
  imagesId: string;

  constructor(data: MachineDto) {
    this.categoryId = data.categoryId;
    this.model = data.model;
    this.brand = data.brand;
    this.hours = data.hours;
    this.year = data.year;
    this.description = data.description;
    this.responsibleSalesPersonId = data.responsibleSalesPersonId;
    this.imagesId = data.imagesId;
    this.validateInput();
    this.sanitizeFields();
    this.validateFieldLengths();
    this.validateHours();
    this.validateYear();
  }

  private validateInput(): void {
    validateField(this.categoryId, 'categoryId');
    validateField(this.model, 'model');
    validateField(this.brand, 'brand');
    validateField(this.description, 'description');
    validateField(this.responsibleSalesPersonId, 'responsible');
    validateField(this.imagesId, 'images');
  }

  private sanitizeFields(): void {
    this.model = sanitizeStringField(this.model);
    this.brand = sanitizeStringField(this.brand);
    this.description = sanitizeStringField(this.description);
  }

  private validateFieldLengths(): void {
    validateFieldLength('model', this.model, 3, 30);
    validateFieldLength('brand', this.brand, 3, 30);
    validateFieldLength('description', this.description, 3, 300);
  }

  private validateHours(): void {
    if (this.hours < 0 || this.hours === null) {
      throw new InvalidParamError('Hours must be greater or equal than 0');
    }
  }

  private validateYear(): void {
    if (this.year < 1990 || this.year > new Date().getFullYear() + 1) {
      throw new InvalidParamError(`Year must be between 1990 and ${new Date().getFullYear() + 1}`);
    }
  }
}
