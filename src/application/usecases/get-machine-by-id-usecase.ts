import { type MachineDto } from '@/domain/dto/machine-dto';
import { type IGetMachineByIdUseCase } from '@/domain/usecases/get-machine-by-id-usecase';
import { type ISearchMachineByIdRepository } from '../interfaces';
import { NotFoundError } from '@/application/errors';

export class GetMachineByIdUseCase implements IGetMachineByIdUseCase {
  constructor(private readonly usecase: ISearchMachineByIdRepository) {}
  async execute(id: string): Promise<MachineDto> {
    const machine = await this.usecase.execute(id);
    if (!machine) throw new NotFoundError('id');
    return machine;
  }
}
