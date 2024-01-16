import {
  type IGetResponsibleSalesPersonRepository,
  type ICreateMachineRepository,
  type IGetCategoryRepository,
  type IGetImagesRepository,
} from '@/application/interfaces';
import { type MachineDto } from '@/domain/dto/machine-dto';
import { MachineEntity } from '@/domain/entities/machine-entity';
import { type ICreateMachineUseCase } from '@/domain/usecases/create-machine-usecase';
import { NotFoundError } from '../errors/not-found-error';

export class CreateMachineUseCase implements ICreateMachineUseCase {
  constructor(
    private readonly getCategoryRepository: IGetCategoryRepository,
    private readonly getResponsibleSalesPersonRepository: IGetResponsibleSalesPersonRepository,
    private readonly getImagesRepository: IGetImagesRepository,
    private readonly createMachineRepository: ICreateMachineRepository
  ) {}

  async execute(input: MachineDto): Promise<void> {
    await Promise.all([
      this.validateCategoryId(input.categoryId),
      this.validateResponsibleSalesPersonId(input.responsibleSalesPersonId),
      this.validateImagesId(input.imagesId),
    ]);
    const machine = new MachineEntity({ ...input, createdAt: new Date() });
    await this.createMachineRepository.execute(machine);
  }

  private async validateCategoryId(categoryId: string): Promise<void> {
    const category = await this.getCategoryRepository.execute(categoryId);
    if (!category) throw new NotFoundError('category');
  }

  private async validateResponsibleSalesPersonId(responsibleSalesPersonId: string): Promise<void> {
    const responsibleSalesPerson = await this.getResponsibleSalesPersonRepository.execute(responsibleSalesPersonId);
    if (!responsibleSalesPerson) throw new NotFoundError('responsibleSalesPerson');
  }

  private async validateImagesId(imagesId: string): Promise<void> {
    const images = await this.getImagesRepository.execute(imagesId);
    if (!images) throw new NotFoundError('images');
  }
}
