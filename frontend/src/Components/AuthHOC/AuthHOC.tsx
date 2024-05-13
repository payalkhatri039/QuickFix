/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDataFromLocalStorage } from '../../helper/AysncStorage';
import { updateUserDetail } from '../../redux/actions/User/actions';
import { RootState } from '../../redux/store';

type DisplayState = 'LOADING' | 'AUTHENICATED';

/**
 *
 * @param Comp Component which should be displased only if user is logged in
 * @returns Comp if user is logged in and redirects to Login page is user is logged out.
 *
 * @description
 * withAuth is a Higher Order Component that will first check the reducer for username and
 * if the username is not found that goes to localstorage to check the username.
 * If the username is not found in localstorage aswell it means user is logged out and
 * therefore is redirected to login page
 */

const withAuth = (Comp) => (props) => {
  const { username } = useSelector((state: RootState) => state.user);
  const [displayState, setDisplayState] = useState<DisplayState>('LOADING');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (username.length === 0) {
      getDataFromLocalStorage('user').then((userDetail) => {
        console.log('User Detail are', userDetail);
        if (userDetail == null || userDetail.username === undefined) {
          navigate('/login');
        } else {
          dispatch(updateUserDetail(userDetail));
          setDisplayState('AUTHENICATED');
        }
      });
    } else {
      setDisplayState('AUTHENICATED');
    }
  }, []);
  return displayState === 'AUTHENICATED' ? <Comp {...props} /> : null;
};

export default withAuth;
