import express from 'express';
import * as pageController from '../controllers/pageContoroller.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router
    .route("/")
    .get(authMiddleware.authenticateToken,  pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLogInPage);
export default router;