import React from 'react';
import { useSelector } from 'react-redux';
import withAuth from '../Components/AuthHOC/AuthHOC';
import BaseContainer from '../Components/BaseContainer';
import ExistingTA from '../Components/TA/ExistingTA';
import Ta from '../Components/TA/TeachingAssistant';
import { RootState } from '../redux/store';

function TeachingAssistant() {
  const { userType } = useSelector((state: RootState) => state.user);
  if (userType === 'TA')
    return (
      <BaseContainer style={{ flexDirection: 'column' }}>
        <br />
        <Ta />
        <ExistingTA />
      </BaseContainer>
    );
  return (
    <div className="bodyClass">
      <div className="lock"></div>
      <div className="message">
        <h1>Access to this page is restricted</h1>
        <p>
          Please check with the site admin if you believe this is a mistake.
        </p>
      </div>
    </div>
  );
}

export default withAuth(TeachingAssistant);
