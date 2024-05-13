import React from 'react';
import '../../styles/Home/Courses.scss';
import CourseForm from './Courses/CourseForm';

/**
 * @returns React.Component
 *
 * This component is called when user is logged in and Home page opens with the course
 * a student is enrolled in and it calls CourseForm Component where
 * all the details are there about the courses
 */
const Courses = () => {
  return (
    <div className="courses box">
      <h6>
        <CourseForm />
      </h6>
    </div>
  );
};

export default Courses;
