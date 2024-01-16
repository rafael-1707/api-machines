import { type ICreateMachineUseCase } from '@/domain/usecases/create-machine-usecase';
import { type MachineDto } from '@/domain/dto/machine-dto';
import { type IController, type IHttpRequest, type IHttpResponse, type IValidation } from '@/presentation/interfaces';
import { badRequest, created, serverError } from '@/presentation/helpers/http/http-helper';
import { errorHandler } from '@/presentation/helpers/error-handler/error-handler';

export class CreateMachineController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly usecase: ICreateMachineUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const input: MachineDto = request.body;
      const error = this.validation.validate(input);
      if (error) return badRequest(error);
      await this.usecase.execute(input);
      return created();
    } catch (error) {
      const err = errorHandler[(error as Error).name] || serverError;
      return err(error as Error);
    }
  }
}
