import React from 'react';
import '../../styles/Assignment/detailsTab.scss';
import AssignmentModal from './ProfModal';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

/**
 *
 * @returns Professor tab details with first name, last name and modal
 */

export default function ProfDetailsTab() {
  const professors = useSelector((state) => state.assignment.professor);
  if (professors) {
    return (
      <div className="detail_main">
        <div className="each_tab">
          {professors.firstName} {professors.lastName}
          <div className="viewDetailsButton">
            <AssignmentModal context={professors} />
          </div>
        </div>
      </div>
    );
  } else {
    <Loader message="Please wait" />;
  }
}
