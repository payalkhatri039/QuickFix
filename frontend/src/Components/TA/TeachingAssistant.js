import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import Input from '../../Components/Input';
import {
  editFAQ,
  getOngoingAssignmentId,
  getAllFAQsAccordingToTA,
  addNewFAQ,
  getAllFAQs
} from '../../redux/actions/TA';
import useFormValidation from '../../hooks/useFormValidation';
import { required } from '../../helper';
import './../../styles/TA/ta.scss';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../helper/ConfirmModal';

/**
 * @returns React.Component
 *
 * This component is called when we open the Teaching Assistant tab and
 * user has to submit the input form with FAQ details
 */
export const Ta = () => {
  const { id } = useSelector((state) => state.user);
  console.log('TA ID IS', id);
  const tas = useSelector((state) => state.ta);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { updateValidation, onSubmitValidation } = useFormValidation();
  let navigate = useNavigate();
  const routeChange = () => {
    if (tas.length > 0) {
      let path = `/courses/${tas[0].courseId}/createSlot`;
      navigate(path);
    }
  };

  useEffect(() => {
    dispatch(getOngoingAssignmentId(id));
  }, [id]);
  const currentAssignment = useSelector(
    (state) => state.currentAssignmentReducer
  );

  console.log('Current assignment is ', currentAssignment);

  const question = useInput(
    {
      id: 'ques',
      value: '',
      errorMessage: 'Please enter valid question'
    },
    [required],
    updateValidation
  );

  const answer = useInput(
    {
      id: 'ans',
      value: '',
      errorMessage: 'Please enter valid answer'
    },
    [required],
    updateValidation
  );

  const onSubmitClickHandler = async (event) => {
    event.preventDefault();
    const { isValid } = onSubmitValidation();
    if (isValid) {
      const faqDetails = {
        ques: question.value,
        ans: answer.value
      };
      dispatch(editFAQ(currentAssignment, faqDetails));
      question.setValue('');
      answer.setValue('');
      setShowModal(true);
    }
  };
  return (
    <>
      <form className="ta">
        <Input
          id="ques"
          label="Question"
          placeholder="Enter new question"
          inputState={question}
          onfocus="this.value=''"
        />
        <Input
          id="ans"
          label="Answer"
          placeholder="Enter new answer"
          inputState={answer}
        />
        <input
          onClick={onSubmitClickHandler}
          type="submit"
          value="Add FAQ"
          className="submitButton1"
        />
      </form>

      <ConfirmModal
        showModal={showModal}
        handleClick={() => setShowModal(false)}
        message="Students of your course can now see the updated FAQ."
        title="FAQ Added"
      />
      <div className="wrapper">
        <button className="content" onClick={routeChange}>
          Create slots
        </button>
      </div>
    </>
  );
};

export default Ta;
