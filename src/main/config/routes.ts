import { Router } from 'express';
import { machineRoutes } from '@/main/routes/machine-routes';

export const routes = Router();

routes.use('/api', machineRoutes);
