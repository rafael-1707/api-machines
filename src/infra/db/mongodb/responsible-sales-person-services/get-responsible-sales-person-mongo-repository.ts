import { type IGetResponsibleSalesPersonRepository } from '@/application/interfaces';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { ObjectId } from 'mongodb';

export class GetResponsibleSalesPersonMongoRepository implements IGetResponsibleSalesPersonRepository {
  async execute(id: string): Promise<string> {
    const collection = await MongoHelper.getCollection('responsibleSalesPerson');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result._id;
  }
}
