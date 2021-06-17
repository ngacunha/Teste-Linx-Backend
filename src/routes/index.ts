import authMiddleware from '@middlewares/AuthMiddleware';
import { Router } from 'express';
import authRoutes from './auth.routes';
import storeRoutes from './starstore.routes';
import userRoutes from './user.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/starstore', authMiddleware, storeRoutes);

export default routes;
