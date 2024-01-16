import { type MachineDto } from '@/domain/dto/machine-dto';

export interface ICreateMachineUseCase {
  execute(input: MachineDto): Promise<void>;
}
