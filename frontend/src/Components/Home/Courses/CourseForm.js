import { useEffect } from 'react';
import {
  getAllCourses,
  getUserCourseDetails
} from '../../../redux/actions/Courses/index';
import { useDispatch, useSelector } from 'react-redux';
import Course from './Course';
import '../../../styles/Home/Course.scss';

/**
 * @returns React.Component
 *
 * This component is called when user is logged in and Home page open
 *  with the course a student is enrolled in and it calls
 *  course component to populate its detail
 */
export const CourseForm = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.id);

  useEffect(() => {
    console.log('hello from courses', userid);
    dispatch(getUserCourseDetails(userid));
  }, []);
  console.log('userid=', userid);
  const currentCourses = useSelector((state) => state.courses);

  console.log('current courses ==', currentCourses);
  return (
    <>
      <article>
        <ul>
          <div className="center">
            <b>Fall 2022 Semester</b>
          </div>
          <br />
          {currentCourses &&
            currentCourses.map((course) => (
              <Course key={course.courseId} course={course} />
            ))}
        </ul>
      </article>
    </>
  );
};

export default CourseForm;
