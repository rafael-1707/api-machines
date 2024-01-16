export interface IDeleteMachineByIdUseCase {
  execute(id: string): Promise<void>;
}
