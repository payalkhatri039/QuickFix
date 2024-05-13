import { Button, message, Modal } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param showModal
 * @param handleClick
 * @param message
 * @param title
 * @returns React.Component
 *
 * This component is called when we have to show the confirmation / success message on the
 *  Profile and FAQ page when user enter the detaols
 */
export default function ConfirmModal({
  showModal,
  handleClick,
  message,
  title
}) {
  return (
    <Modal
      title={title}
      open={showModal}
      footer={[
        <Button onClick={handleClick} key="submit">
          OK
        </Button>
      ]}
      centered
      closeIcon={false}
    >
      <p>{message}</p>
    </Modal>
  );
}
