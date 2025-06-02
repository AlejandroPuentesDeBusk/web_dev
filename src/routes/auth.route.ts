import { Router } from "express";
import { getTimeToken, loginMethod, updateToken, verifyTokenMethod } from "../controllers/auth.controller";


const router = Router();


router.post ('/login', loginMethod);
router.get('/time/:userId', getTimeToken);
router.post('/verify-token', verifyTokenMethod);
router.put('/update/:userId', updateToken);

export default router;