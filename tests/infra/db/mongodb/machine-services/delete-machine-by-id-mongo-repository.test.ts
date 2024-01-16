import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection, ObjectId } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { DeleteMachineByIdMongoRepository } from '@/infra/db/mongodb/machine-services/delete-machine-by-id-mongo-repository';
import { inputFake } from '../../../../fake/input-fake';

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

const makeSut = (): DeleteMachineByIdMongoRepository => {
  return new DeleteMachineByIdMongoRepository();
};

describe('DeleteMachineMongoRepository', () => {
  test('Should delete an machine', async () => {
    const sut = makeSut();
    const machine = await collection.insertOne(inputFake);
    await sut.execute(new ObjectId(machine.insertedId).toHexString());
    const protocols = await collection.find({}).toArray();
    expect(protocols).toHaveLength(0);
  });
});
