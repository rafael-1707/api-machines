import { type IDeleteMachineByIdUseCase } from '@/domain/usecases/delete-machine-by-id-usecase';
import { type IDeleteMachineByIdRepository, type ISearchMachineByIdRepository } from '@/application/interfaces';
import { NotFoundError } from '@/application/errors/not-found-error';

export class DeleteMachineByIdUseCase implements IDeleteMachineByIdUseCase {
  constructor(
    private readonly searchRepository: ISearchMachineByIdRepository,
    private readonly deleteRepository: IDeleteMachineByIdRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.searchById(id);
    await this.deleteRepository.execute(id);
    return null;
  }

  private async searchById(id: string): Promise<void> {
    const isValid = await this.searchRepository.execute(id);
    if (!isValid) throw new NotFoundError('id');
  }
}
