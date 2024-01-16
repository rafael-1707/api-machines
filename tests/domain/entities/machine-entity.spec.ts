import { MachineEntity } from '@/domain/entities/machine-entity';
import { type MachineDto } from '@/domain/dto/machine-dto';
import { inputFake } from '../../fake/input-fake';
import { MissingParamError } from '@/domain/errors/missing-param-error';
import { InvalidParamError } from '@/domain/errors/invalid-param-error';

const makeSut = (params: MachineDto): MachineEntity => {
  return new MachineEntity(params);
};

describe('MachineEntity', () => {
  describe('method validateInput()', () => {
    test('Should throw an error if categoryId is empty', () => {
      expect(() => makeSut({ ...inputFake, categoryId: '' })).toThrow(new MissingParamError('categoryId'));
    });

    test('Should throw an error if model is empty', () => {
      expect(() => makeSut({ ...inputFake, model: '' })).toThrow(new MissingParamError('model'));
    });

    test('Should throw an error if brand is empty', () => {
      expect(() => makeSut({ ...inputFake, brand: '' })).toThrow(new MissingParamError('brand'));
    });

    test('Should throw an error if description is empty', () => {
      expect(() => makeSut({ ...inputFake, description: '' })).toThrow(new MissingParamError('description'));
    });

    test('Should throw an error if responsible is empty', () => {
      expect(() => makeSut({ ...inputFake, responsibleSalesPersonId: '' })).toThrow(new MissingParamError('responsible'));
    });

    test('Should throw an error if images is empty', () => {
      expect(() => makeSut({ ...inputFake, imagesId: '' })).toThrow(new MissingParamError('images'));
    });
  });

  describe('method sanitizeFields()', () => {
    test('Should sanitize the model', () => {
      const machine = makeSut({ ...inputFake, model: 'any_$mod#el' });
      expect(machine.model).toBe('any_model');
    });

    test('Should sanitize the brand', () => {
      const machine = makeSut({ ...inputFake, brand: 'any_b%ra$#nd' });
      expect(machine.brand).toBe('any_brand');
    });

    test('Should sanitize the description', () => {
      const machine = makeSut({ ...inputFake, model: 'any_descr¨%$#iption' });
      expect(machine.description).toBe('any_description');
    });
  });

  describe('method validateFieldLengths()', () => {
    test('Should throw an error if model is less than 3 characters', () => {
      expect(() => makeSut({ ...inputFake, model: 'aa' })).toThrow(new InvalidParamError('model must be between 3 and 30 characters'));
    });

    test('Should throw an error if model is greater than 30 characters', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          model: Math.random() + 'a'.repeat(31),
        })
      ).toThrow(new InvalidParamError('model must be between 3 and 30 characters'));
    });

    test('Should throw an error if brand is less than 3 characters', () => {
      expect(() => makeSut({ ...inputFake, brand: 'aa' })).toThrow(new InvalidParamError('brand must be between 3 and 30 characters'));
    });

    test('Should throw an error if brand is greater than 30 characters', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          brand: Math.random() + 'a'.repeat(31),
        })
      ).toThrow(new InvalidParamError('brand must be between 3 and 30 characters'));
    });

    test('Should throw an error if description is less than 3 characters', () => {
      expect(() => makeSut({ ...inputFake, description: 'aa' })).toThrow(
        new InvalidParamError('description must be between 3 and 300 characters')
      );
    });

    test('Should throw an error if description is greater than 300 characters', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          description: Math.random() + 'a'.repeat(301),
        })
      ).toThrow(new InvalidParamError('description must be between 3 and 300 characters'));
    });
  });

  describe('method validateHours()', () => {
    test('Should throw an error if hours is null', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          hours: null,
        })
      ).toThrow(new InvalidParamError('Hours must be greater or equal than 0'));
    });

    test('Should throw an error if hours is less than zero', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          hours: -1,
        })
      ).toThrow(new InvalidParamError('Hours must be greater or equal than 0'));
    });
  });

  describe('method validateYear()', () => {
    test('Should throw an error if year is less than 1990', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          year: 1989,
        })
      ).toThrow(new InvalidParamError(`Year must be between 1990 and ${new Date().getFullYear() + 1}`));
    });

    test('Should throw an error if year is greater than current year + 1', () => {
      expect(() =>
        makeSut({
          ...inputFake,
          year: 2030,
        })
      ).toThrow(new InvalidParamError(`Year must be between 1990 and ${new Date().getFullYear() + 1}`));
    });
  });
});
