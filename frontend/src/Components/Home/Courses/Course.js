import { useDispatch } from 'react-redux';
import { useState } from 'react';
import '../../../styles/Home/Course.scss';
import { useNavigate } from 'react-router-dom';
import * as ImIcons from 'react-icons/im';

/**
 *
 * @param course
 * @returns React.Component
 *
 * This component is called when user is logged in and Home page opens with the course
 * a student is enrolled in
 */
const Course = ({ course }) => {
  const [status, setStatus] = useState(false);
  const onButtonClickTodo = (e) => {
    e.preventDefault();
    setStatus(!status);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/assignments/${course._id}`;
    navigate(path);
  };
  const dispatch = useDispatch();

  return (
    <>
      <div className="task">
        <div className="part1">
          {course.courseId}
          <br />
          Enrolled
        </div>
        <div className="part2" onClick={onButtonClickTodo}>
          <b>{course.courseName}</b> &ensp;&ensp;
          <h6>
            <a onClick={routeChange}>
              <u>Assignments</u>
            </a>
          </h6>
          <br />
        </div>
        {status ? (
          <div className="task1">
            Description: {course.description} <br />
          </div>
        ) : null}
      </div>
      <div></div>
    </>
  );
};

export default Course;
