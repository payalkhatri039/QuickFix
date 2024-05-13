import React, { useState } from 'react';
import Input from '../../Components/Input';
import useFormValidation from '../../hooks/useFormValidation';
import useInput from '../../hooks/useInput';
import { numberValidator, required } from '../../helper';
import './../../styles/Profile/profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileDetails } from '../../helper/handleAPI';
import { updateUserDetail } from '../../redux/actions/User/actions';
import { setLocalStorageData } from '../../helper/AysncStorage';
import withAuth from '../AuthHOC/AuthHOC';
import { Player } from '@lottiefiles/react-lottie-player';
import ConfirmModal from '../../helper/ConfirmModal';

/**
 *
 * @returns React.Component
 *
 * This component is called when we open the Profile tab
 * in the sidebar menu and user wants to update the profile
 * by adding additional details like gender, description, linkedinURL
 * and years of experience. User can add and update these details.
 */
const Profile = () => {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    gender,
    description,
    linkedInURL,
    experience,
    username
  } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const { updateValidation, onSubmitValidation } = useFormValidation();
  const firstNameField = useInput(
    {
      id: 'firstName',
      value: firstName,
      errorMessage: 'Please enter valid firstName'
    },
    [required],
    updateValidation
  );

  const lastNameField = useInput(
    {
      id: 'lastName',
      value: lastName,
      errorMessage: 'Please enter valid lastName'
    },
    [required],
    updateValidation
  );

  const genderField = useInput(
    {
      id: 'gender',
      value: gender,
      errorMessage: 'Please enter valid Pronoun'
    },
    [required],
    updateValidation
  );

  const descField = useInput(
    {
      id: 'desc',
      value: description,
      errorMessage: 'Please enter valid Description'
    },
    [required],
    updateValidation
  );

  const urlField = useInput(
    {
      id: 'url',
      value: linkedInURL,
      errorMessage: 'Please enter valid Linkedin URL'
    },
    [required],
    updateValidation
  );

  const experienceField = useInput(
    {
      id: 'experience',
      value: experience,
      errorMessage: 'Please enter valid number of years of Experience'
    },
    [numberValidator],
    updateValidation
  );

  const onSubmitClickHandler = async (event) => {
    event.preventDefault();
    const { isValid } = onSubmitValidation();
    if (isValid) {
      const profileDetails = {
        firstName: firstNameField.value,
        lastName: lastNameField.value,
        gender: genderField.value,
        description: descField.value,
        linkedInURL: urlField.value,
        experience: experienceField.value,
        username
      };
      const response = await updateProfileDetails(profileDetails);
      dispatch(updateUserDetail(response));
      setLocalStorageData('user', response);
      setShowModal(true);
    }
  };
  return (
    <>
      <br />
      <div className="profilePic">
        <Player
          autoplay
          loop
          src="https://lottie.host/d3432d00-1e97-41c0-88df-3c361f109b78/ul0Z6Uih7M.json"
          style={{
            height: '18rem',
            width: '18rem',
            position: 'relative'
          }}
        >
          <Player
            autoplay
            loop
            src="https://assets4.lottiefiles.com/packages/lf20_8pL7DHZXvo.json"
            style={{
              height: '18rem',
              width: '18rem',
              position: 'absolute',
              top: 0
            }}
            className="check"
          />
        </Player>

        <form className="profiledesc">
          <div className="inForm-FN_LN1">
            <Input
              id="firstName"
              label="First Name"
              placeholder="Enter First Name..."
              inputState={firstNameField}
              readOnly={true}
            />
            <Input
              id="lastName"
              label="Last Name"
              placeholder="Enter Last Name..."
              inputState={lastNameField}
              readOnly={true}
            />
          </div>
          <div className="inForm-FN_LN ">
            <Input
              id="gender"
              label="Pronoun"
              placeholder="Enter Pronoun..."
              inputState={genderField}
            />
            <Input
              id="desc"
              label="Description"
              placeholder="Enter Description..."
              inputState={descField}
              component="textarea"
            />
          </div>
          <div className="inForm-FN_LN ">
            <Input
              id="url"
              label="LinkedIn Profile"
              placeholder="Enter LinkedIn Profile..."
              inputState={urlField}
            />
            <Input
              id="experience"
              label="Work Experience"
              placeholder="Enter Work Experience..."
              inputState={experienceField}
            />
          </div>
          <input
            onClick={onSubmitClickHandler}
            type="submit"
            value="Add Details"
            className="submitButton2"
          />
          <ConfirmModal
            showModal={showModal}
            handleClick={() => setShowModal(false)}
            message="Students of your course can now see the updated Profile."
            title="Profile Updated"
          />
          <br />
        </form>
      </div>
    </>
  );
};

export default withAuth(Profile);
