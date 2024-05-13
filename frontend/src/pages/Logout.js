import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setLocalStorageData } from '../helper/AysncStorage';

/**
 * On logout, navigates to login and sets localStorage - null.
 */
export default function Logout() {
  let navigate = useNavigate();

  useEffect(() => {
    let path = `/login`;
    setLocalStorageData('user', '');
    navigate(path);
  }, []);

  return <div></div>;
}
