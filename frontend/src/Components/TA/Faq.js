// import { toggleTodo2 } from '../redux/actions/index'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import './../../styles/TA/ta.scss';

/**
 *
 * @param faq
 * @returns React.Component
 *
 * This component is called inside the Assignments when we need to get the FAQ
 *  according to the assignments and current assignment
 */
const Faq = ({ faq }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="faq">
        FAQ: <span></span> <br />
        {faq.ques} <br />
        {faq.ans} <br />
      </div>
    </>
  );
};

export default Faq;
