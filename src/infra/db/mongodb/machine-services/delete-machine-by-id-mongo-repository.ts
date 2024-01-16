import { type IDeleteMachineByIdRepository } from '@/application/interfaces';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class DeleteMachineByIdMongoRepository implements IDeleteMachineByIdRepository {
  async execute(id: string): Promise<void> {
    const collection = await MongoHelper.getCollection('machines');
    await collection.deleteOne({
      _id: new ObjectId(id),
    });
  }
}
