import express from "express";
import * as courseUserController from "../controllers/CourseUserController";

const router = express.Router();

//router for courses user
router.route('/')
    .post(courseUserController.createAllCourseUsers)
    .get(courseUserController.getAllCourseUsers);

router.route('/:id')
    .get(courseUserController.getAllUsersOfCourseById)
    .put(courseUserController.updateCourseUsers);

router.route('/:id/assignmentList')
    .get(courseUserController.getAllAssignmentsAccordingToTA);
router.route('/:id/OngoingAssignmentId')
    .get(courseUserController.getOnGoingAssignmentId);


export default router;