import { Router } from 'express';
import userController from '../controllers/userController';
const userRouter = Router();

userRouter.route('/signup').post(userController.createNewUser);
userRouter.route('/signin').post(userController.authenticateUser);
userRouter
  .route('/forgotpassword')
  .post(userController.createPasswordToken)
  .get(userController.verifyForgotPasswordToken)
  .put(userController.changePassword);

userRouter.route('/:id').get(userController.getUserCourses);

userRouter.route('/profile').put(userController.updateUserProfile);

export default userRouter;
