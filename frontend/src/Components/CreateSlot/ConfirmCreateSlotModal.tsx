import { Button, Modal } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param param0
 * @returns React.Component
 *
 * This component is called when TA successfully
 * creates a slot and a confirmation UI needs to be displayed
 */
export default function ConfirmCreateSlotModal({ showModal, handleClick }) {
  const navigate = useNavigate();
  const handleConfirmPressed = () => {
    navigate('/');
  };
  return (
    <Modal
      title="Slots Successfully Created"
      open={showModal}
      footer={[
        <Button onClick={handleConfirmPressed} key="submit">
          OK
        </Button>
      ]}
      centered
      closeIcon={false}
    >
      <p>Students of your course are successfully notified over email.</p>
    </Modal>
  );
}
