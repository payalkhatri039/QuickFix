import React from 'react';
import '../../styles/Home/Profile.scss';
import { useSelector } from 'react-redux';
import Avatar, { genConfig } from 'react-nice-avatar';
import ProfilePhoto from './../../Images/ProfilePhoto.png';
import { taMaleAvatar } from '../../constant';
import { Player } from '@lottiefiles/react-lottie-player';

/**
 * This component is called when user is logged in and Home page opens with the profile of the student
 * Student name and NEUID are displayed
 *
 * @param {*} logged in user details
 *
 */
const Profile = ({ user }) => {
  const { firstName } = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.id);
  const neuid_num = id.substring(0, 5);
  const neuid = neuid_num + neuid_num;
  const config = genConfig(taMaleAvatar);

  //displaying greeting according to the browser time
  var myDate = new Date();
  var hours = myDate.getHours();
  var greet;
  if (hours < 12) greet = 'MORNING';
  else if (hours >= 12 && hours <= 17) greet = 'AFTERNOON';
  else if (hours >= 17 && hours <= 24) greet = 'EVENING';

  return (
    <div className="profile box">
      <Player
        autoplay
        loop
        src="https://lottie.host/d3432d00-1e97-41c0-88df-3c361f109b78/ul0Z6Uih7M.json"
        style={{
          height: '18rem',
          width: '18rem',
          position: 'relative'
        }}
      >
        <Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/packages/lf20_8pL7DHZXvo.json"
          style={{
            height: '18rem',
            width: '18rem',
            position: 'absolute',
            top: 0
          }}
          className="check"
        />
      </Player>

      <div className="right-side">
        <div className="greeting">
          GOOD {greet},<h2 className="name">{firstName}</h2>
          <h5 className="neuid">NUID:{neuid}</h5>
        </div>
      </div>
    </div>
  );
};
export default Profile;
