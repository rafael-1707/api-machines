export interface IGetCategoryRepository {
  execute(id: string): Promise<string>;
}
