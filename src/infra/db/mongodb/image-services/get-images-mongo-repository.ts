import { type IGetImagesRepository } from '@/application/interfaces';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class GetImagesMongoRepository implements IGetImagesRepository {
  async execute(id: string): Promise<string> {
    const collection = await MongoHelper.getCollection('images');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result._id;
  }
}
