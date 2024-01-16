import { type MachineDto } from '@/domain/dto/machine-dto';

export interface ISearchMachineByIdRepository {
  execute(id: string): Promise<MachineDto>;
}

export namespace ISearchMachineByIdRepository {
  export type Model = MachineDto;
}
