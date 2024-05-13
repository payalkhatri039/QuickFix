import React from 'react';

/**
 *
 * @param param0
 * @returns React.Component
 *
 * @description
 * This is a wrapper React Component which adds a
 * common background to entire web app and adds
 * overflow y scroll
 */
export default function BaseContainer({ children, style = {} }) {
  return (
    <div className="page_base_container" style={{ ...style }}>
      {children}
    </div>
  );
}
