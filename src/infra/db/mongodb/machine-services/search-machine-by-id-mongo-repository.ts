import { type ISearchMachineByIdRepository } from '@/application/interfaces';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class SearchMachineByIdMongoRepository implements ISearchMachineByIdRepository {
  async execute(id: string): Promise<ISearchMachineByIdRepository.Model> {
    const collection = await MongoHelper.getCollection('machines');
    const machine = await collection.findOne({ _id: new ObjectId(id) });
    return machine;
  }
}
