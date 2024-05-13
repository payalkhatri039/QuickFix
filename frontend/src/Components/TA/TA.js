import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Faq from './Faq';
import './../../styles/TA/ta.scss';

/**
 *
 * @param ta
 * @returns React.Component
 *
 * This component is called when user who is logged in gets each assignments details and
 * like assignmentId, assignmentName and the details of the assignment. Finally
 * it parses the FAQ array list to FAQ component
 */
const Ta = ({ ta }) => {
  const dispatch = useDispatch();
  const [show, setStatus] = useState(false);
  const [current, setCurrent] = useState('');
  const handleClick = () => {
    setStatus(!show);
  };
  let faqs = ta.FAQs;
  return (
    <>
      <div className="span">
        <br />
        <div className="task2" onClick={() => handleClick()}>
          {ta.assignmentName}
          <span></span>&nbsp;
          {ta.details} <br />
        </div>
        <div className="column_flex align-center ">
          {show
            ? faqs && faqs.map((faq) => <Faq key={faq._id} faq={faq} />)
            : null}
        </div>
      </div>
    </>
  );
};

export default Ta;
