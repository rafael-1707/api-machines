import { type IController } from '@/presentation/interfaces';
import { SearchMachineByIdMongoRepository } from '@/infra/db/mongodb/machine-services/search-machine-by-id-mongo-repository';
import { DeleteMachineByIdUseCase } from '@/application/usecases/delete-machine-by-id-usecase';
import { DeleteMachineByIdMongoRepository } from '@/infra/db/mongodb/machine-services/delete-machine-by-id-mongo-repository';
import { DeleteMachineByIdController } from '@/presentation/controllers/delete-machine-by-id-controller';
import { makeDeleteMachineValidation } from './delete-machine-validation-factory';

export const makeDeleteMachineByIdFactory = (): IController => {
  const searchMachineByIdMongoRepository = new SearchMachineByIdMongoRepository();
  const deleteMachineMongoRepository = new DeleteMachineByIdMongoRepository();
  const deleteMachineUseCase = new DeleteMachineByIdUseCase(searchMachineByIdMongoRepository, deleteMachineMongoRepository);
  const deleteMachineController = new DeleteMachineByIdController(makeDeleteMachineValidation(), deleteMachineUseCase);
  return deleteMachineController;
};
