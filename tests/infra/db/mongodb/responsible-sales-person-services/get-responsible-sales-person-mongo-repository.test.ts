import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GetResponsibleSalesPersonMongoRepository } from '@/infra/db/mongodb/responsible-sales-person-services/get-responsible-sales-person-mongo-repository';

let collection: Collection;
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await MongoHelper.connect(uri);
});

afterAll(async () => {
  await MongoHelper.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  collection = await MongoHelper.getCollection('responsibleSalesPerson');
  await collection.deleteMany({});
});

const makeSut = (): GetResponsibleSalesPersonMongoRepository => {
  return new GetResponsibleSalesPersonMongoRepository();
};

describe('GetResponsibleSalesPersonMongoRepository', () => {
  test('Should get a responsible sales person by id', async () => {
    const sut = makeSut();
    const responsibleSalesPerson = await collection.insertOne({ name: 'any_name' });
    const getResponsible = await sut.execute(responsibleSalesPerson.insertedId.toString());
    expect(getResponsible).toEqual(responsibleSalesPerson.insertedId);
  });
});
