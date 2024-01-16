import { type IGetCategoryRepository } from '@/application/interfaces';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class GetCategoryMongoRepository implements IGetCategoryRepository {
  async execute(id: string): Promise<string> {
    const collection = await MongoHelper.getCollection('categories');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result) return null;
    return result._id;
  }
}
