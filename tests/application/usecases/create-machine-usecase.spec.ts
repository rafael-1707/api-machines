import { MachineEntity } from '@/domain/entities/machine-entity';
import { inputFake } from '../../fake/input-fake';
import {
  type IGetResponsibleSalesPersonRepository,
  type ICreateMachineRepository,
  type IGetCategoryRepository,
  type IGetImagesRepository,
} from '@/application/interfaces';
import { CreateMachineUseCase } from '@/application/usecases/create-machine-usecase';
import { NotFoundError } from '@/application/errors/not-found-error';

const makeGetCategoryRepository = (): IGetCategoryRepository => {
  class GetCategoryRepositoryStub implements IGetCategoryRepository {
    async execute(id: string): Promise<string> {
      return await Promise.resolve('any_category');
    }
  }
  return new GetCategoryRepositoryStub();
};

const makeGetResponsibleSalesPersonRepository = (): IGetResponsibleSalesPersonRepository => {
  class GetResponsibleSalesPersonRepositoryStub implements IGetResponsibleSalesPersonRepository {
    async execute(id: string): Promise<string> {
      return await Promise.resolve('any_id');
    }
  }
  return new GetResponsibleSalesPersonRepositoryStub();
};

const makeGetImagesRepository = (): IGetImagesRepository => {
  class GetImagesRepositoryStub implements IGetImagesRepository {
    async execute(id: string): Promise<string> {
      return await Promise.resolve('any_id');
    }
  }
  return new GetImagesRepositoryStub();
};

const makeCreateMachineRepository = (): ICreateMachineRepository => {
  class CreateMachineRepositoryStub implements ICreateMachineRepository {
    async execute(input: MachineEntity): Promise<void> {
      await Promise.resolve();
    }
  }
  return new CreateMachineRepositoryStub();
};

type SutTypes = {
  getResponsibleSalesPersonRepositoryStub: IGetResponsibleSalesPersonRepository;
  getCategoryRepositoryStub: IGetCategoryRepository;
  getImagesRepositoryStub: IGetImagesRepository;
  createMachineRepositoryStub: ICreateMachineRepository;
  sut: CreateMachineUseCase;
};

const makeSut = (): SutTypes => {
  const getCategoryRepositoryStub = makeGetCategoryRepository();
  const getResponsibleSalesPersonRepositoryStub = makeGetResponsibleSalesPersonRepository();
  const getImagesRepositoryStub = makeGetImagesRepository();
  const createMachineRepositoryStub = makeCreateMachineRepository();
  const sut = new CreateMachineUseCase(
    getCategoryRepositoryStub,
    getResponsibleSalesPersonRepositoryStub,
    getImagesRepositoryStub,
    createMachineRepositoryStub
  );
  return {
    getCategoryRepositoryStub,
    getResponsibleSalesPersonRepositoryStub,
    getImagesRepositoryStub,
    createMachineRepositoryStub,
    sut,
  };
};

describe('CreateMachineUseCase', () => {
  test('Should call GetCategoryRepository with correct values', async () => {
    const { sut, getCategoryRepositoryStub } = makeSut();
    const getCategoryRepositorySpy = jest.spyOn(getCategoryRepositoryStub, 'execute');
    await sut.execute(inputFake);
    expect(getCategoryRepositorySpy).toHaveBeenCalledWith(inputFake.categoryId);
  });

  test('Should throw notFoundError if GetCategoryRepository throws', async () => {
    const { sut, getCategoryRepositoryStub } = makeSut();
    jest.spyOn(getCategoryRepositoryStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const promise = sut.execute(inputFake);
    await expect(promise).rejects.toThrow(new NotFoundError('category'));
  });

  test('Should call GetResponsibleSalesPersonRepository with correct values', async () => {
    const { sut, getResponsibleSalesPersonRepositoryStub } = makeSut();
    const getResponsibleSalesPersonRepositorySpy = jest.spyOn(getResponsibleSalesPersonRepositoryStub, 'execute');
    await sut.execute(inputFake);
    expect(getResponsibleSalesPersonRepositorySpy).toHaveBeenCalledWith(inputFake.responsibleSalesPersonId);
  });

  test('Should throw notFoundError if GetResponsibleSalesPersonRepository throws', async () => {
    const { sut, getResponsibleSalesPersonRepositoryStub } = makeSut();
    jest.spyOn(getResponsibleSalesPersonRepositoryStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const promise = sut.execute(inputFake);
    await expect(promise).rejects.toThrow(new NotFoundError('responsibleSalesPerson'));
  });

  test('Should call GetImagesRepository with correct values', async () => {
    const { sut, getImagesRepositoryStub } = makeSut();
    const getImagesRepositorySpy = jest.spyOn(getImagesRepositoryStub, 'execute');
    await sut.execute(inputFake);
    expect(getImagesRepositorySpy).toHaveBeenCalledWith(inputFake.imagesId);
  });

  test('Should throw notFoundError if GetImagesRepository throws', async () => {
    const { sut, getImagesRepositoryStub } = makeSut();
    jest.spyOn(getImagesRepositoryStub, 'execute').mockReturnValueOnce(Promise.resolve(null));
    const promise = sut.execute(inputFake);
    await expect(promise).rejects.toThrow(new NotFoundError('images'));
  });

  test('Should call CreateMachineRepository with correct values', async () => {
    const { sut, createMachineRepositoryStub } = makeSut();
    const createMachineRepositorySpy = jest.spyOn(createMachineRepositoryStub, 'execute');
    await sut.execute(inputFake);
    const machine = new MachineEntity({ ...inputFake, createdAt: new Date() });
    expect(createMachineRepositorySpy).toHaveBeenCalledWith(machine);
  });
});
