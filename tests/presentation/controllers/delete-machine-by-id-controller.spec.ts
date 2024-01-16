import { type IValidation } from '@/presentation/interfaces';
import { DeleteMachineByIdController } from '@/presentation/controllers/delete-machine-by-id-controller';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper';
import { type IDeleteMachineByIdUseCase } from '@/domain/usecases/delete-machine-by-id-usecase';

const makeFakeRequest = {
  params: {
    id: 'any_id',
  },
};

const makeDeleteMachineUseCase = (): IDeleteMachineByIdUseCase => {
  class DeleteMachineUseCaseStub implements IDeleteMachineByIdUseCase {
    async execute(id: string): Promise<void> {}
  }
  return new DeleteMachineUseCaseStub();
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
  deleteMachineUseCaseStub: IDeleteMachineByIdUseCase;
  validationstub: IValidation;
  sut: DeleteMachineByIdController;
};

const makeSut = (): SutTypes => {
  const deleteMachineUseCaseStub = makeDeleteMachineUseCase();
  const validationstub = makeValidationStub();
  const sut = new DeleteMachineByIdController(validationstub, deleteMachineUseCaseStub);
  return {
    deleteMachineUseCaseStub,
    validationstub,
    sut,
  };
};

describe('DeleteMachineController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationstub } = makeSut();
    const validationSpy = jest.spyOn(validationstub, 'validate');
    await sut.handle(makeFakeRequest);
    expect(validationSpy).toHaveBeenCalledWith({ id: 'any_id' });
  });

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationstub } = makeSut();
    jest.spyOn(validationstub, 'validate').mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest);
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test('Should call DeleteMachineUseCase with correct values', async () => {
    const { sut, deleteMachineUseCaseStub } = makeSut();
    const deleteMachineUseCaseSpy = jest.spyOn(deleteMachineUseCaseStub, 'execute');
    await sut.handle(makeFakeRequest);
    expect(deleteMachineUseCaseSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should return 500 if DeleteMachineUseCase throws', async () => {
    const { sut, deleteMachineUseCaseStub } = makeSut();
    jest.spyOn(deleteMachineUseCaseStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest);
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test('Should return 204 if DeleteMachineUseCase is success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest);
    expect(httpResponse).toEqual(noContent());
  });
});
