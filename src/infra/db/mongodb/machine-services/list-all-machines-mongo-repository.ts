import { type IListAllMachinesRepository } from '@/application/interfaces/machines/list-all-machines-repository';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

export class ListAllMachinesMongoRepository implements IListAllMachinesRepository {
  async execute(): Promise<IListAllMachinesRepository.Model> {
    const collection = await MongoHelper.getCollection('machines');
    const listMachines = await collection.find().toArray();
    return listMachines;
  }
}
