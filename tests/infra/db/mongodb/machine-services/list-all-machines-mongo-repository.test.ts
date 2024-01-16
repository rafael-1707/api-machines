import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { inputFake } from '../../../../fake/input-fake';
import { MachineEntity } from '@/domain/entities/machine-entity';
import { ListAllMachinesMongoRepository } from '@/infra/db/mongodb/machine-services/list-all-machines-mongo-repository';

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

const makeSut = (): ListAllMachinesMongoRepository => {
  return new ListAllMachinesMongoRepository();
};

describe('ListAllMachinesMongoRepository', () => {
  test('Should list all machines', async () => {
    const sut = makeSut();
    const entity = new MachineEntity(inputFake);
    await collection.insertOne(entity);
    const listAllMachines = await sut.execute();
    expect(listAllMachines).toHaveLength(1);
  });
});
