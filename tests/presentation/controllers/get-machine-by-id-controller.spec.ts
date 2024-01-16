import { type IValidation } from '@/presentation/interfaces';
import { GetMachineByIdController } from '@/presentation/controllers/get-machine-by-id-controller';
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper';
import { type MachineDto } from '@/domain/dto/machine-dto';
import { inputFake } from '../../fake/input-fake';
import { type IGetMachineByIdUseCase } from '@/domain/usecases/get-machine-by-id-usecase';

const fakeRequest = {
  params: {
    id: 'any_id',
  },
};

const makeGetMachineByIdUseCase = (): IGetMachineByIdUseCase => {
  class GetMachineByIdUseCaseStub implements IGetMachineByIdUseCase {
    async execute(id: string): Promise<MachineDto> {
      return await Promise.resolve(inputFake);
    }
  }
  return new GetMachineByIdUseCaseStub();
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

type SutTypes = {
  getMachineByIdUseCaseStub: IGetMachineByIdUseCase;
  validationStub: IValidation;
  sut: GetMachineByIdController;
};

const makeSut = (): SutTypes => {
  const getMachineByIdUseCaseStub = makeGetMachineByIdUseCase();
  const validationStub = makeValidationStub();
  const sut = new GetMachineByIdController(validationStub, getMachineByIdUseCaseStub);
  return {
    getMachineByIdUseCaseStub,
    validationStub,
    sut,
  };
};

describe('GetMachineByIdController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    await sut.handle(fakeRequest);
    expect(validationSpy).toHaveBeenCalledWith({ id: 'any_id' });
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call GetMachineByIdUseCase with correct values', async () => {
    const { sut, getMachineByIdUseCaseStub } = makeSut();
    const getMachineByIdUseCaseSpy = jest.spyOn(getMachineByIdUseCaseStub, 'execute');
    await sut.handle(fakeRequest);
    expect(getMachineByIdUseCaseSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 500 if GetMachineByIdUseCase throws', async () => {
    const { sut, getMachineByIdUseCaseStub } = makeSut();
    jest.spyOn(getMachineByIdUseCaseStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 200 if GetMachineByIdUseCase is success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(fakeRequest);
    expect(httpResponse).toEqual(ok(inputFake));
  });
});
