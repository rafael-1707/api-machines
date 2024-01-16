import { inputFake } from '../../fake/input-fake';
import { type IListAllMachinesRepository } from '@/application/interfaces/machines/list-all-machines-repository';
import { ListAllMachinesUseCase } from '@/application/usecases/list-all-machines-usecase';
import { type MachineDto } from '@/domain/dto/machine-dto';

const makeListAllMachinesRepository = (): IListAllMachinesRepository => {
  class ListAllMachinesRepositoryStub implements IListAllMachinesRepository {
    async execute(): Promise<MachineDto[]> {
      return await Promise.resolve([inputFake]);
    }
  }
  return new ListAllMachinesRepositoryStub();
};

type SutTypes = {
  listAllMachinesRepositoryStub: IListAllMachinesRepository;
  sut: ListAllMachinesUseCase;
};

const makeSut = (): SutTypes => {
  const listAllMachinesRepositoryStub = makeListAllMachinesRepository();
  const sut = new ListAllMachinesUseCase(listAllMachinesRepositoryStub);
  return {
    listAllMachinesRepositoryStub,
    sut,
  };
};

describe('ListAllMachinesUseCase', () => {
  test('Should call ListAllMachinesRepository', async () => {
    const { sut, listAllMachinesRepositoryStub } = makeSut();
    const listAllMachinesRepositorySpy = jest.spyOn(listAllMachinesRepositoryStub, 'execute');
    await sut.execute();
    expect(listAllMachinesRepositorySpy).toHaveBeenCalled();
  });

  test('Should throw if ListAllMachinesRepository throws', async () => {
    const { sut, listAllMachinesRepositoryStub } = makeSut();
    jest.spyOn(listAllMachinesRepositoryStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.execute();
    await expect(promise).rejects.toThrow();
  });

  test('Should return an list of machines on success', async () => {
    const { sut } = makeSut();
    const response = await sut.execute();
    expect(response).toEqual([inputFake]);
  });
});
