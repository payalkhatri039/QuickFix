import '../../styles/ManageBookings/ManageBookings.scss';
import React from 'react';
import { Tabs, Tag } from 'antd';

const { TabPane } = Tabs;
/**
 * @param {tabValue, onTabChange} : tabValue consists of the column headings,
 *  onTabChange consists the key value from map, used to call particular component
 */
export default function BookingsHeader({ tabValue, onTabChange }) {
  const onTabClick = (e) => {
    onTabChange(e);
  };
  return (
    <Tabs defaultActiveKey="0" className="card" onChange={onTabClick}>
      {tabValue.map((v, i) => (
        <TabPane
          tab={<span className="bookings_headText">{v}</span>}
          key={i}
        ></TabPane>
      ))}
    </Tabs>
  );
}
