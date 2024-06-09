import Router from 'express';
import userRegister from '../controller/userController/register';
import loginUser from '../controller/userController/login';
import verifyAuthToken from '../middleware/auth';
import resourceDummy from '../controller/resource';

const router = Router();

router.post('/api/user/register', userRegister);
router.get('/api/user/login', loginUser);
router.get('/api/resource', verifyAuthToken, resourceDummy);

export default router;
