import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GetCategoryMongoRepository } from '@/infra/db/mongodb/category-services/get-category-mongo-repository';

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
  collection = await MongoHelper.getCollection('categories');
  await collection.deleteMany({});
});

const makeSut = (): GetCategoryMongoRepository => {
  return new GetCategoryMongoRepository();
};

describe('GetCategoryMongoRepository', () => {
  test('Should get a category by id', async () => {
    const sut = makeSut();
    const category = await collection.insertOne({ name: 'any_name' });
    const getCategory = await sut.execute(category.insertedId.toString());
    expect(getCategory).toEqual(category.insertedId);
  });

  test('Should return null if category does not exist', async () => {
    const sut = makeSut();
    const getCategory = await sut.execute('6597eb606685f5ba28cb9e5b');
    expect(getCategory).toBeNull();
  });
});
