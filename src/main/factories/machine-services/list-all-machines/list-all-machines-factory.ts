import { ListAllMachinesUseCase } from '@/application/usecases/list-all-machines-usecase';
import { ListAllMachinesMongoRepository } from '@/infra/db/mongodb/machine-services/list-all-machines-mongo-repository';
import { ListAllMachinesController } from '@/presentation/controllers/list-all-machines-controller';
import { type IController } from '@/presentation/interfaces';

export const makeListAllMachinesFactory = (): IController => {
  const listAllMachinesMongoRepository = new ListAllMachinesMongoRepository();
  const listAllMachinesUseCase = new ListAllMachinesUseCase(listAllMachinesMongoRepository);
  return new ListAllMachinesController(listAllMachinesUseCase);
};
