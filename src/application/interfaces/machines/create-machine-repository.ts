import { type MachineEntity } from '@/domain/entities/machine-entity';

export interface ICreateMachineRepository {
  execute(input: MachineEntity): Promise<void>;
}

export namespace ICreateMachineRepository {
  export type Model = MachineEntity;
}
