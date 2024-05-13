import React from 'react';
import '../../styles/Assignment/detailsTab.scss';
import '../../styles/Assignment/assignmentModal.scss';
import TaModal from './TaModal';
import { useDispatch, useSelector } from 'react-redux';

/**
 *
 * @param {*} param
 * @returns TA tab details with TA first name and last name and Modal
 */
const TADetails = ({ user }) => {
  const dispatch = useDispatch();
  const TA_Details = useSelector((state) => state.assignment.tas);
  console.log('ta deets:', TA_Details);

  return (
    <div className="detail_main">
      {TA_Details.map((ta) => (
        <div>
          <div className="each_tab">
            {ta.firstName} {ta.lastName}
            <div className="viewDetailsButton">
              <TaModal context={ta} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TADetails;
