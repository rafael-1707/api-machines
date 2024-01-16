import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { type Collection } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { inputFake } from '../../../../fake/input-fake';
import { MachineEntity } from '@/domain/entities/machine-entity';
import { SearchMachineByIdMongoRepository } from '@/infra/db/mongodb/machine-services/search-machine-by-id-mongo-repository';

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

const makeSut = (): SearchMachineByIdMongoRepository => {
  return new SearchMachineByIdMongoRepository();
};

describe('SearchMachineByIdMongoRepository', () => {
  test('Should search a machine by id', async () => {
    const sut = makeSut();
    const entity = new MachineEntity(inputFake);
    const createMachine = await collection.insertOne(entity);
    const searchMachine = await sut.execute(createMachine.insertedId.toString());
    const machine = await collection.findOne({ _id: createMachine.insertedId });

    expect(searchMachine).toBeTruthy();
    expect(searchMachine.categoryId).toEqual(machine.categoryId);
    expect(searchMachine.brand).toEqual(machine.brand);
  });
});
