export interface IDeleteMachineByIdRepository {
  execute(id: string): Promise<void>;
}
