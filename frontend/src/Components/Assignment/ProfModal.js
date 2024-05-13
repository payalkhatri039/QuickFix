import React, { useState } from 'react';
import { Button, Modal } from 'antd';
/**
 *
 * @param {*} param
 * @returns Modal to display following details of professor:
 * 1. Name
 * 2. Email
 */

function ProfModal({ context }) {
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
        </div>
      </Modal>
    </>
  );
}

export default ProfModal;
