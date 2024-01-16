import { type MachineDto } from '@/domain/dto/machine-dto';
import { inputFake } from '../../fake/input-fake';
import { ListAllMachinesController } from '@/presentation/controllers/list-all-machines-controller';
import { type IListAllMachinesUseCase } from '@/domain/usecases/list-all-machines-usecase';
import { ok, serverError } from '@/presentation/helpers/http/http-helper';

const makeListAllMachinesUseCase = (): IListAllMachinesUseCase => {
  class ListAllMachinesUseCaseStub implements IListAllMachinesUseCase {
    async execute(): Promise<MachineDto[]> {
      return await Promise.resolve([inputFake]);
    }
  }
  return new ListAllMachinesUseCaseStub();
};

type SutTypes = {
  listAllMachinesUseCaseStub: IListAllMachinesUseCase;
  sut: ListAllMachinesController;
};

const makeSut = (): SutTypes => {
  const listAllMachinesUseCaseStub = makeListAllMachinesUseCase();
  const sut = new ListAllMachinesController(listAllMachinesUseCaseStub);
  return {
    listAllMachinesUseCaseStub,
    sut,
  };
};

describe('ListAllMachinesController', () => {
  test('Should call ListAllMachinesUseCase', async () => {
    const { sut, listAllMachinesUseCaseStub } = makeSut();
    const listAllMachinesUseCaseSpy = jest.spyOn(listAllMachinesUseCaseStub, 'execute');
    await sut.handle({});
    expect(listAllMachinesUseCaseSpy).toHaveBeenCalled();
  });
  test('Should return 500 if ListAllMachinesUseCase throws', async () => {
    const { sut, listAllMachinesUseCaseStub } = makeSut();
    jest.spyOn(listAllMachinesUseCaseStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
  test('Should return 200 with an empty array if ListAllMachinesUseCase succeeds', async () => {
    const { sut, listAllMachinesUseCaseStub } = makeSut();
    jest.spyOn(listAllMachinesUseCaseStub, 'execute').mockReturnValueOnce(Promise.resolve([]));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok([]));
  });
  test('Should return 200 if ListAllMachinesUseCase succeeds', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok([inputFake]));
  });
});
