import React from 'react';
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from 'react-icons/ai';
import * as ImIcons from 'react-icons/im';
import * as BsIcons from 'react-icons/bs';
import * as MdIcons from 'react-icons/md';

/**
 * Sidebar consists of the following page navigations:
 * 1. Home page
 * 2. Profile page
 * 3. Bookings page
 * 4. Teaching Assistantpage
 * 5. Logout
 */
export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <ImIcons.ImBook />,
    cName: 'nav-text'
  },
  {
    title: 'Bookings',
    path: '/bookings',
    icon: <BsIcons.BsFillPersonFill />,
    cName: 'nav-text'
  },
  {
    title: 'Teaching Assistant',
    path: '/teachingAssistant',
    icon: <BsIcons.BsFillPersonFill />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];
