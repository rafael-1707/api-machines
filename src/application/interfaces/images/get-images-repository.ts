export interface IGetImagesRepository {
  execute(id: string): Promise<string>;
}
