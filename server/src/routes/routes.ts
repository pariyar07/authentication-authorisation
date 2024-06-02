import Router from 'express';
import userRegister from '../controller/userController/register';

const router = Router();

router.post('/user', userRegister);

export default router;
