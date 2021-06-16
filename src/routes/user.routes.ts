import { registerUser } from '@controllers/user.controller';
import { Router } from 'express';

const userRoutes = Router();

userRoutes.post('/register', registerUser);

export default userRoutes;
