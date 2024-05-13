import React, { useState, useEffect } from 'react';
import { GET_ALL_DETAILS } from '../redux/actions/type';
import AgHeader from '../Components/Assignment/AssignmentHeader';
import '../styles/Assignment/assignment.scss';
import ProfDetailTab from '../Components/Assignment/ProfDetailsTab';
import TADetails from '../Components/Assignment/TADetails';
import OnGoingAgmt from '../Components/Assignment/OnGoingAsgmt';
import CompletedAgmt from '../Components/Assignment/CompletedAsgmt';
import { getCourseSpecifiedData } from '../helper/handleAPI';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllDetails } from '../redux/actions/Assignment/index';
import withAuth from '../Components/AuthHOC/AuthHOC';

/**
 *
 * @returns 4 tabs for the following:
 * 1. Professor
 * 2. Teaching Assistant
 * 3. Completed Assignment
 * 4. On Going Assignment
 */
function Assignment() {
  const [tab, setTab] = useState('0');
  const tabDataTemp = {
    dataV: ['Professor', 'Teaching Assistant', 'Completed', 'On Going']
  };
  const { courseID } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getCourseSpecifiedData(courseID).then((courseData) => {
      dispatch({
        type: GET_ALL_DETAILS,
        payload: courseData
      });
    });
  }, []);

  const onTabChange = (tab) => {
    setTab(tab);
  };

  const getTabUI = () => {
    switch (tab) {
      case '0': {
        return <ProfDetailTab></ProfDetailTab>;
      }
      case '1': {
        return <TADetails></TADetails>;
      }
      case '2': {
        return <CompletedAgmt></CompletedAgmt>;
      }
      case '3': {
        return <OnGoingAgmt></OnGoingAgmt>;
      }
      default: {
        return <div></div>;
      }
    }
  };

  return (
    <div className="assignment_main">
      <div className="asgmt_scroller">
        <AgHeader tabValue={tabDataTemp.dataV} onTabChange={onTabChange} />
      </div>
      {getTabUI()}
    </div>
  );
}

export default withAuth(Assignment);
