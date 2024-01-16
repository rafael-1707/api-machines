import { type ICreateMachineRepository } from '@/application/interfaces';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';

export class CreateMachineMongoRepository implements ICreateMachineRepository {
  async execute(data: ICreateMachineRepository.Model): Promise<void> {
    const collection = await MongoHelper.getCollection('machines');
    await collection.insertOne(data);
  }
}
