import { Router } from 'express';
import { AdaptRoutes } from '../../adapters/express-adapter';
import { makeCreateMachineFactory } from '@/main/factories/machine-services/create-machine';
import { makeDeleteMachineByIdFactory } from '@/main/factories/machine-services/delete-machine-by-id';
import { makeListAllMachinesFactory } from '@/main/factories/machine-services/list-all-machines';
import { makeGetMachineByIdFactory } from '@/main/factories/machine-services/get-machine-by-id';

export const machineRoutes = Router();

machineRoutes
  .post('/create/machine', AdaptRoutes(makeCreateMachineFactory()))
  .delete('/delete/machine/:id', AdaptRoutes(makeDeleteMachineByIdFactory()))
  .get('/public/list/machines', AdaptRoutes(makeListAllMachinesFactory()))
  .get('/public/get/machine/:id', AdaptRoutes(makeGetMachineByIdFactory()));
