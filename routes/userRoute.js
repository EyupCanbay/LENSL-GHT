import express from "express";
import * as userController from "../controllers/userContoller.js";


const router = express.Router();

router.route('/register').post(userController.userCreate);
router.route('/login').post(userController.loginUser);



export default router;