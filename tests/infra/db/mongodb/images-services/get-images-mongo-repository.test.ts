import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { GetImagesMongoRepository } from '@/infra/db/mongodb/image-services/get-images-mongo-repository';

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
  collection = await MongoHelper.getCollection('images');
  await collection.deleteMany({});
});

const makeSut = (): GetImagesMongoRepository => {
  return new GetImagesMongoRepository();
};

describe('GetImagesMongoRepository', () => {
  test('Should get a images by id', async () => {
    const sut = makeSut();
    const images = await collection.insertOne({ urls: ['any_url'] });
    const getImages = await sut.execute(images.insertedId.toString());
    expect(getImages).toEqual(images.insertedId);
  });
});
