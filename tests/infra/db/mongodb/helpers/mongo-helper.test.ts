import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { MongoMemoryServer } from 'mongodb-memory-server';

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

const sut = MongoHelper;

describe('MongoHelper', () => {
  test('Should reconnect if mongodb is down', async () => {
    let collection = await sut.getCollection('categories');
    expect(collection).toBeTruthy();
    await sut.disconnect();
    collection = await sut.getCollection('categories');
    expect(collection).toBeTruthy();
  });
});
