import React, { useState } from 'react';
import { Button, Modal } from 'antd';
/**
 *
 * @param {*} param
 * @returns React Modal to display data of tas in popup
 * Following details are displayed on clicking "View Details" button
 *1. Email
 *2. Pronoun
 *3. Description
 *4. LinkedIn URL
 *5. Years of Experience
 */
function TaModal({ context }) {
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
  const isGender = context.gender;
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
          <p className="modal-content">
            Name: {context.firstName} {context.lastName} <br></br>
          </p>
          <p className="modal-content">Email: {context.email}</p>

          {context.gender ? (
            <p className="modal-content">Pronoun: {context.gender}</p>
          ) : null}

          {context.description ? (
            <p className="modal-content">Description:{context.description}</p>
          ) : null}
          {context.linkedInURL ? (
            <p className="modal-content">
              {' '}
              LinkedIn URL:
              <a href={context.linkedInURL}>{context.linkedInURL}</a>
            </p>
          ) : null}
          {context.experience ? (
            <p className="modal-content">
              Experience :{context.experience} years
            </p>
          ) : null}
        </div>
      </Modal>
    </>
  );
}

export default TaModal;
