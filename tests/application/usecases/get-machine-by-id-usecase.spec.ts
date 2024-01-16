import { type MachineDto } from '@/domain/dto/machine-dto';
import { type ISearchMachineByIdRepository } from '@/application/interfaces';
import { inputFake } from '../../fake/input-fake';
import { GetMachineByIdUseCase } from '@/application/usecases/get-machine-by-id-usecase';
import { NotFoundError } from '@/application/errors';

const makeSearchMachineByIdRepository = (): ISearchMachineByIdRepository => {
  class SearchMachineByIdRepositoryStub implements ISearchMachineByIdRepository {
    async execute(id: string): Promise<MachineDto> {
      return await Promise.resolve(inputFake);
    }
  }
  return new SearchMachineByIdRepositoryStub();
};

type SutTypes = {
  searchMachineByIdRepositoryStub: ISearchMachineByIdRepository;
  sut: GetMachineByIdUseCase;
};

const makeSut = (): SutTypes => {
  const searchMachineByIdRepositoryStub = makeSearchMachineByIdRepository();
  const sut = new GetMachineByIdUseCase(searchMachineByIdRepositoryStub);
  return {
    searchMachineByIdRepositoryStub,
    sut,
  };
};

describe('GetMachineByIdUseCase', () => {
  test('Should call SearchMachineByIdRepository with correct values', async () => {
    const { sut, searchMachineByIdRepositoryStub } = makeSut();
    const searchMachineByIdRepositorySpy = jest.spyOn(searchMachineByIdRepositoryStub, 'execute');
    await sut.execute('any_id');
    expect(searchMachineByIdRepositorySpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw NotFoundError if SearchMachineByIdRepository received an invalid id', async () => {
    const { sut, searchMachineByIdRepositoryStub } = makeSut();
    jest.spyOn(searchMachineByIdRepositoryStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const promise = sut.execute('any_id');
    await expect(promise).rejects.toThrow(new NotFoundError('id'));
  });

  test('Should throw if SearchMachineByIdRepository throws', async () => {
    const { sut, searchMachineByIdRepositoryStub } = makeSut();
    jest.spyOn(searchMachineByIdRepositoryStub, 'execute').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.execute('any_id');
    await expect(promise).rejects.toThrow();
  });

  test('Should return a machine if GetMachineByIdUseCase is succeeds', async () => {
    const { sut } = makeSut();
    const response = await sut.execute('any_id');
    expect(response).toEqual(inputFake);
  });
});
