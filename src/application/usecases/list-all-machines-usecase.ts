import { type MachineDto } from '@/domain/dto/machine-dto';
import { type IListAllMachinesUseCase } from '@/domain/usecases/list-all-machines-usecase';
import { type IListAllMachinesRepository } from '@/application/interfaces/machines/list-all-machines-repository';

export class ListAllMachinesUseCase implements IListAllMachinesUseCase {
  constructor(private readonly repository: IListAllMachinesRepository) {}
  async execute(): Promise<MachineDto[]> {
    const machine = await this.repository.execute();
    return machine;
  }
}
