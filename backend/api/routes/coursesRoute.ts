import express from 'express';
import * as courseController from '../controllers/coursesController';

const router = express.Router();

//router for courses
router
  .route('/')
  .post(courseController.createNewCourse)
  .get(courseController.getAllCourses);

router.route('/details/:id').get(courseController.getAllDetailsOfCourseById);

router
  .route('/:id')
  .put(courseController.updateCourse)
  .get(courseController.getCourseById);

router.route('/:id/talist').get(courseController.getCourseTAList);

export default router;
