import { type MachineDto } from '@/domain/dto/machine-dto';

export interface IGetMachineByIdUseCase {
  execute(id: string): Promise<MachineDto>;
}
