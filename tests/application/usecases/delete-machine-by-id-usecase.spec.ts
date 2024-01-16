import { type IDeleteMachineByIdRepository, type ISearchMachineByIdRepository } from '@/application/interfaces';
import { DeleteMachineByIdUseCase } from '@/application/usecases/delete-machine-by-id-usecase';
import { type IDeleteMachineByIdUseCase } from '@/domain/usecases/delete-machine-by-id-usecase';
import { type MachineDto } from '@/domain/dto/machine-dto';
import { inputFake } from '../../fake/input-fake';
import { NotFoundError } from '@/application/errors/not-found-error';

const makeDeleteMachineRepository = (): IDeleteMachineByIdRepository => {
  class DeleteMachineRepositoryStub implements IDeleteMachineByIdRepository {
    async execute(id: string): Promise<void> {}
  }
  return new DeleteMachineRepositoryStub();
};

const makeSearchMachineByIdRepository = (): ISearchMachineByIdRepository => {
  class SearchMachineByIdStub implements ISearchMachineByIdRepository {
    async execute(id: string): Promise<MachineDto> {
      return await Promise.resolve(inputFake);
    }
  }
  return new SearchMachineByIdStub();
};

type SutTypes = {
  deleteMachineRepositoryStub: IDeleteMachineByIdRepository;
  searchMachineByIdStub: ISearchMachineByIdRepository;
  sut: IDeleteMachineByIdUseCase;
};

const makeSut = (): SutTypes => {
  const deleteMachineRepositoryStub = makeDeleteMachineRepository();
  const searchMachineByIdStub = makeSearchMachineByIdRepository();
  const sut = new DeleteMachineByIdUseCase(searchMachineByIdStub, deleteMachineRepositoryStub);
  return {
    deleteMachineRepositoryStub,
    searchMachineByIdStub,
    sut,
  };
};

describe('DeleteMachineUseCase', () => {
  test('Should call SearchMachineByIdRepository with correct values', async () => {
    const { sut, searchMachineByIdStub } = makeSut();
    const searchMachineByIdSpy = jest.spyOn(searchMachineByIdStub, 'execute');
    await sut.execute('any_id');
    expect(searchMachineByIdSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw NotFoundError if SearchMachineByIdRepository received an invalid id', async () => {
    const { sut, searchMachineByIdStub } = makeSut();
    jest.spyOn(searchMachineByIdStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const promise = sut.execute('any_id');
    await expect(promise).rejects.toThrow(new NotFoundError('id'));
  });

  test('Should throw if SearchMachineByIdRepository throws', async () => {
    const { sut, searchMachineByIdStub } = makeSut();
    jest.spyOn(searchMachineByIdStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.execute('any_id');
    await expect(promise).rejects.toThrow();
  });

  test('Should call DeleteMachineRepository with correct values', async () => {
    const { sut, deleteMachineRepositoryStub } = makeSut();
    const deleteMachineRepositorySpy = jest.spyOn(deleteMachineRepositoryStub, 'execute');
    await sut.execute('any_id');
    expect(deleteMachineRepositorySpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw if DeleteMachineRepository throws', async () => {
    const { sut, deleteMachineRepositoryStub } = makeSut();
    jest.spyOn(deleteMachineRepositoryStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.execute('any_id');
    await expect(promise).rejects.toThrow();
  });

  test('Should delete a machine on success', async () => {
    const { sut } = makeSut();
    expect(await sut.execute('any_id')).toBeNull();
  });
});
