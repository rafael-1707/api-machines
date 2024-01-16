import { type MachineDto } from '@/domain/dto/machine-dto';

export interface IListAllMachinesRepository {
  execute(): Promise<MachineDto[]>;
}

export namespace IListAllMachinesRepository {
  export type Model = MachineDto[];
}
