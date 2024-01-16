import { CreateMachineController } from '@/presentation/controllers/create-machine-controller';
import { type IValidation } from '@/presentation/interfaces/validation';
import { type ICreateMachineUseCase } from '@/domain/usecases/create-machine-usecase';
import { type MachineDto } from '@/domain/dto/machine-dto';
import { inputFake } from '../../fake/input-fake';
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper';

const inputFakeRequest = {
  body: inputFake,
};

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    error: Error = null;
    validate(input: any): Error {
      return this.error;
    }
  }
  return new ValidationStub();
};

const makeCreateMachineUseCaseStub = (): ICreateMachineUseCase => {
  class CreateMachineUseCaseStub implements ICreateMachineUseCase {
    async execute(input: MachineDto): Promise<void> {}
  }
  return new CreateMachineUseCaseStub();
};

type SutTypes = {
  validationStub: IValidation;
  createMachineUseCaseStub: ICreateMachineUseCase;
  sut: CreateMachineController;
};

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub();
  const createMachineUseCaseStub = makeCreateMachineUseCaseStub();
  const sut = new CreateMachineController(validationStub, createMachineUseCaseStub);
  return {
    validationStub,
    createMachineUseCaseStub,
    sut,
  };
};

describe('CreateMachineController', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(inputFakeRequest);
    expect(validationSpy).toHaveBeenCalledWith(inputFakeRequest.body);
  });

  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(inputFakeRequest);
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call CreateMachineUseCase with correct values', async () => {
    const { sut, createMachineUseCaseStub } = makeSut();
    const createMachineSpy = jest.spyOn(createMachineUseCaseStub, 'execute');
    await sut.handle(inputFakeRequest);
    expect(createMachineSpy).toHaveBeenCalled();
  });

  test('Should return 500 if CreateMachineUseCase throws', async () => {
    const { sut, createMachineUseCaseStub } = makeSut();
    jest
      .spyOn(createMachineUseCaseStub, 'execute')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(inputFakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 if create machine is success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(inputFakeRequest);
    expect(httpResponse).toEqual(created());
  });
});
