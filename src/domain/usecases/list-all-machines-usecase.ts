import { type MachineDto } from '../dto/machine-dto';

export interface IListAllMachinesUseCase {
  execute(): Promise<MachineDto[]>;
}
