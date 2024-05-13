import React from 'react';
import { Tabs, Tag } from 'antd';
import '../../styles/Assignment/assignment.scss';
import { useSelector } from 'react-redux';

const { TabPane } = Tabs;

/**
 *
 * @param {*} param
 * @returns Header showing the following tabs:
 * 1. Professor
 * 2. Teaching Assistant
 * 3. Completed Assignments
 * 4. Ongoing Assignments
 */
export default function AssignmentHeader({ tabValue, onTabChange }) {
  const tas = useSelector((state) => state.assignment.tas);
  const assignments = useSelector((state) => state.assignment.assignments);

  //Finding count of each tab content
  if (tas) {
    var taCount = Object.keys(tas).length;
  }
  const profCount = 1;
  if (assignments) {
    var completedAssignmentCount = Object.keys(assignments).length - 1;
  }
  const OngoingAssignment = 1;

  const countOfAssignment = [
    profCount,
    taCount,
    completedAssignmentCount,
    OngoingAssignment
  ];

  const onTabClick = (e) => {
    onTabChange(e);
  };
  return (
    <Tabs defaultActiveKey="0" className="card" onChange={onTabClick}>
      {tabValue.map((v, i) => (
        <TabPane
          tab={
            <span className="assignment_headText">
              {v}
              {console.log(v)}
              <Tag className="asgmt_header">
                <strong>{countOfAssignment[i]}</strong>
              </Tag>
            </span>
          }
          key={i}
        ></TabPane>
      ))}
    </Tabs>
  );
}
