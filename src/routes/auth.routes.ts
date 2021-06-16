import { Authenticate } from '@controllers/Auth.controller';
import { Router } from 'express';

const authRoutes = Router();

authRoutes.post('/', Authenticate);

export default authRoutes;
