import { type IController } from '@/presentation/interfaces';
import { SearchMachineByIdMongoRepository } from '@/infra/db/mongodb/machine-services/search-machine-by-id-mongo-repository';
import { GetMachineByIdUseCase } from '@/application/usecases/get-machine-by-id-usecase';
import { GetMachineByIdController } from '@/presentation/controllers/get-machine-by-id-controller';
import { makeGetMachineByIdValidation } from './get-machine-by-id-validation-factory';

export const makeGetMachineByIdFactory = (): IController => {
  const searchMachineByIdMongoRepository = new SearchMachineByIdMongoRepository();
  const getMachineByIdUseCase = new GetMachineByIdUseCase(searchMachineByIdMongoRepository);
  const getMachineByIdController = new GetMachineByIdController(makeGetMachineByIdValidation(), getMachineByIdUseCase);
  return getMachineByIdController;
};
