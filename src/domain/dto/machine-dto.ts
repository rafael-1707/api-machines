export type MachineDto = {
  id?: string;
  categoryId: string;
  model: string;
  brand: string;
  hours: number;
  year: number;
  description: string;
  responsibleSalesPersonId: string;
  imagesId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
