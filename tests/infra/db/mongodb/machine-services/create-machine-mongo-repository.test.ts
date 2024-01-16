import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CreateMachineMongoRepository } from '@/infra/db/mongodb/machine-services/create-machine-mongo-repository';
import { inputFake } from '../../../../fake/input-fake';
import { MachineEntity } from '@/domain/entities/machine-entity';

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
  collection = await MongoHelper.getCollection('machines');
  await collection.deleteMany({});
});

const makeSut = (): CreateMachineMongoRepository => {
  return new CreateMachineMongoRepository();
};

describe('CreateMachineMongoRepository', () => {
  test('Should create a machine', async () => {
    const sut = makeSut();
    const entity = new MachineEntity(inputFake);
    await sut.execute(entity);
    const protocol = await collection.find({}).toArray();
    expect(protocol).toHaveLength(1);
  });
});
