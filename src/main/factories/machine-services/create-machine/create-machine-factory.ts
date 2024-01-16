import { CreateMachineUseCase } from '@/application/usecases/create-machine-usecase';
import { GetCategoryMongoRepository } from '@/infra/db/mongodb/category-services/get-category-mongo-repository';
import { GetImagesMongoRepository } from '@/infra/db/mongodb/image-services/get-images-mongo-repository';
import { CreateMachineMongoRepository } from '@/infra/db/mongodb/machine-services/create-machine-mongo-repository';
import { GetResponsibleSalesPersonMongoRepository } from '@/infra/db/mongodb/responsible-sales-person-services/get-responsible-sales-person-mongo-repository';
import { CreateMachineController } from '@/presentation/controllers/create-machine-controller';
import { type IController } from '@/presentation/interfaces';
import { makeCreateMachineValidation } from './create-machine-validation-factory';

export const makeCreateMachineFactory = (): IController => {
  const getCategoryRepository = new GetCategoryMongoRepository();
  const getResponsibleSalesPersonRepository = new GetResponsibleSalesPersonMongoRepository();
  const getImagesRepository = new GetImagesMongoRepository();
  const createMachineMongoRepository = new CreateMachineMongoRepository();
  const createMachineUseCase = new CreateMachineUseCase(
    getCategoryRepository,
    getResponsibleSalesPersonRepository,
    getImagesRepository,
    createMachineMongoRepository
  );
  return new CreateMachineController(makeCreateMachineValidation(), createMachineUseCase);
};
