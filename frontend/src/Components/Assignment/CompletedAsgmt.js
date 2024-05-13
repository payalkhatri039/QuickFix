import React from 'react';
import '../../styles/Assignment/detailsTab.scss';
import CompleteAssignmentModal from './CompletedAsgmtModal';
import { useDispatch, useSelector } from 'react-redux';

/**
 *
 * @returns Completed assignment tab showing the assignment name and modal with further details
 */
export default function CompletedAsgmt() {
  const completedAs = ['Assignment 1', 'Assignment 2'];
  const dispatch = useDispatch();
  const assigments = useSelector((state) => state.assignment.assignments);
  const currentAssignment = useSelector(
    (state) => state.assignment.currentAssignment
  );

  /**
   * Using filter to remove current assgnment from the assignments array and get the completed assignment array
   */
  const completedAssignments = assigments.filter(
    (i) => i._id !== currentAssignment._id
  );
  console.log('Completed assigment list ', completedAssignments);

  return (
    <div className="detail_main">
      {completedAssignments.map((assignment) => (
        <div>
          <div className="each_tab">
            {assignment.assignmentName}
            <div className="viewDetailsButton">
              <CompleteAssignmentModal context={assignment} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
