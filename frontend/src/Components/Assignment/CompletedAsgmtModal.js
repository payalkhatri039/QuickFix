import React, { useState } from 'react';
import { Button, Modal } from 'antd';

/**
 *
 * @param {context} param
 * @returns React Component
 *
 * Assignment modal to display following data of completed assignments
 * 1. Assignment Name
 * 2. Assignment Marks
 * 3. Due Date
 * 4. Descriptin
 * 5. Frequently Asked Questions and their answers
 */
function CompleteAssignmentModal({ context }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const FAQs = context.FAQs;
  var ctr = 0;
  return (
    <>
      <Button className="modalBackground" type="primary" onClick={showModal}>
        View Details
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
      >
        <div className="div1">
          <p className="innerAssignmentContainerTitle">
            <b> {context.assignmentName}</b>
            <br></br>
            <br></br>
          </p>
          <div className="innerContainerAsgmtDetails">
            <p>
              <b>
                <span className="asgnTag">Assignment Marks:</span>{' '}
              </b>
              {context.assignmentMarks}
              <br></br>
              <br></br>
            </p>
            <div className="innerAssignmentContainerDueDate">
              <p>
                <b>
                  <span className="asgnTag">Due:</span>{' '}
                </b>
                {context.dueDate.split('T')[0]}
                <br></br>
                <br></br>
              </p>
            </div>
          </div>
          <p>
            <b>
              <span className="asgnTag">Description:</span>{' '}
            </b>{' '}
            {context.details}
            <br></br>
            <br></br>
          </p>
        </div>
        <div className="faq-div">
          <p className="faqAssignmentTitle">
            <b>Frequently Asked Questions </b>
          </p>
          {FAQs.map((faq) => (
            <p>
              <div className="eachFaqDiv">
                {' '}
                <b>
                  <span className="asgnTag">Question:</span>
                </b>{' '}
                {faq.ques} <br></br>
                <b>
                  <span className="asgnTag">
                    <i>Answer:</i>
                  </span>{' '}
                </b>
                <i>{faq.ans}</i>
                <br></br>
                <br></br>
              </div>
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default CompleteAssignmentModal;
