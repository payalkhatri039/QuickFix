import React from 'react';
import '../styles/Home/home.scss';
import Courses from './../Components/Home/Courses';
import Profile from './../Components/Home/Profile';
import './../App.css';
import withAuth from '../Components/AuthHOC/AuthHOC';
import BaseContainer from '../Components/BaseContainer';

/**
 *
 * @param faq
 * @returns React.Component
 *
 * This component is called when we land on homepage and
 * there are two sections: Profile and Courses
 */
function Home() {
  return (
    <BaseContainer>
      <div className="home">
        <div className="row_flex row_center">
          <Profile />
          <Courses />
        </div>
      </div>
    </BaseContainer>
  );
}

export default withAuth(Home);
