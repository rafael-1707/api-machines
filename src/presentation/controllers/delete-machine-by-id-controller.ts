import { type IValidation, type IController, type IHttpRequest, type IHttpResponse } from '@/presentation/interfaces';
import { badRequest, noContent, serverError } from '@/presentation/helpers/http/http-helper';
import { type IDeleteMachineByIdUseCase } from '@/domain/usecases/delete-machine-by-id-usecase';
import { errorHandler } from '@/presentation/helpers/error-handler/error-handler';

export class DeleteMachineByIdController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly usecase: IDeleteMachineByIdUseCase
  ) {}

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request.params);
      if (error) return badRequest(error);
      await this.usecase.execute(request.params.id);
      return noContent();
    } catch (error) {
      const err = errorHandler[(error as Error).name] || serverError;
      return err(error as Error);
    }
  }
}
