import express from "express";
import * as userController from "../controllers/userContoller.js";
import * as aoutMiddleware from "../middlewares/authMiddleware.js"


const router = express.Router();

router.route('/register').post(userController.userCreate);
router.route('/login').post(userController.loginUser);
router.route('/dashboard').get(aoutMiddleware.authenticateToken,  userController.getDashboardPage);



export default router;