import { type IListAllMachinesUseCase } from '@/domain/usecases/list-all-machines-usecase';
import { type IController, type IHttpRequest, type IHttpResponse } from '../interfaces';
import { ok, serverError } from '@/presentation/helpers/http/http-helper';

export class ListAllMachinesController implements IController {
  constructor(private readonly usecase: IListAllMachinesUseCase) {}
  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const machines = await this.usecase.execute();
      return ok(machines);
    } catch (error) {
      return serverError(error);
    }
  }
}
