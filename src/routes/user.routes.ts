import { registerUser } from '@controllers/user.controller';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/', registerUser);

export default userRoutes;
