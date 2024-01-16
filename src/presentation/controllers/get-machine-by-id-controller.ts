import { type IController, type IHttpRequest, type IHttpResponse, type IValidation } from '@/presentation/interfaces';
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper';
import { type IGetMachineByIdUseCase } from '@/domain/usecases/get-machine-by-id-usecase';
import { errorHandler } from '@/presentation/helpers/error-handler/error-handler';

export class GetMachineByIdController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly usecase: IGetMachineByIdUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request.params);
      if (error) return badRequest(error);
      const machine = await this.usecase.execute(request.params.id);
      return ok(machine);
    } catch (error) {
      const err = errorHandler[(error as Error).name] || serverError;
      return err(error as Error);
    }
  }
}
