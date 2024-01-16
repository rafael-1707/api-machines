export interface IGetResponsibleSalesPersonRepository {
  execute(id: string): Promise<string>;
}
