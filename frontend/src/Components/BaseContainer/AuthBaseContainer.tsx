import React from 'react';
import '../../styles/SignIn-Up/ripple.scss';

/**
 *
 * @param children : React.Component
 * @param styles : custom styles
 * @returns wrapper React Component
 *
 * @description
 * This component is used to add animation to the auth flow.
 * It takes Auth components as children and applies animation
 * in the background
 */

export default function AuthBaseContainer({ children, styles = {} }) {
  return (
    <div className="bg_login_container" style={styles}>
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {children}
    </div>
  );
}
