import '../../styles/Assignment/detailsTab.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param {*} param
 * @returns On going assignment tab showing the following details:
 * 1. Assignment Name
 * 2. Assignment Marks
 * 3. Due Date
 * 4. Descriptin
 * 5. Frequently Asked Questions and their answers
 *
 * Book Slot option is provided to book a slot with TAs if there are further questions related to the assignment
 */

const OngoingAssignment = ({ assignment }) => {
  const dispatch = useDispatch();
  const currentAssignment = useSelector(
    (state) => state.assignment.currentAssignment
  );

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/courses/${currentAssignment.courseId}/bookslot`;
    navigate(path);
  };

  const FAQs = currentAssignment.FAQs;
  var ctr = 0;
  return (
    <div className="ongoing-div">
      <div className="div1">
        <div>
          <p className="innerContainerTitle">
            <b>{currentAssignment.assignmentName}</b>
            <br></br>
            <br></br>
          </p>
        </div>
        <div className="innerContainerAsgmtDetails">
          <p>
            <b>
              {' '}
              <span className="tag">Assignment Marks:</span>{' '}
            </b>
            {currentAssignment.assignmentMarks}
            <br></br>
            <br></br>
          </p>
          <div className="innerContainerDueDate">
            <p>
              <b>
                {' '}
                <span className="tag">Due : </span>
              </b>
              {currentAssignment.dueDate.split('T')[0]}
              <br></br>
              <br></br>
            </p>
          </div>
        </div>
        <p>
          <b>
            {' '}
            <span className="tag">Description: </span>
          </b>{' '}
          {currentAssignment.details}
          <br></br>
          <br></br>
        </p>
      </div>
      <div className="faq-div">
        <p className="faqTitle">
          <b>Frequently Asked Questions </b>
          <br></br>
          <br></br>
        </p>
        {FAQs.map((faq) => (
          <div className="eachFaqDiv">
            {' '}
            <p className="question">
              <span className="tag">Question: </span>
              {faq.ques}{' '}
            </p>
            <p className="answer">
              <span className="tag">
                <i>Answer: </i>
              </span>
              <i>{faq.ans}</i>
            </p>
            <br></br>
            <br></br>
          </div>
        ))}
      </div>
      <button className="bookSlot" onClick={routeChange}>
        Book Slot
      </button>
    </div>
  );
};

export default OngoingAssignment;
