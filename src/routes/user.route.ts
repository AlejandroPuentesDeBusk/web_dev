import { Router } from 'express';
import { deleteUser, getAllUsers, getUserByUsername, saveUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers); // GET /api/users
router.get("/:username", getUserByUsername);


router.post('/create', saveUser);
router.put('/update/:userId', updateUser);
router.delete('/delete/:userId', deleteUser);

export default router;
