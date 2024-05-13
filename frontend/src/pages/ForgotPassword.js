import { useState } from 'react';
import '../styles/SignIn-Up/signIn-Up.scss';
import { emailValidator, required } from '../helper/index';
import useFormValidation from '../hooks/useFormValidation';
import useInput from '../hooks/useInput';
import Input from '../Components/Input/index';
import { forgotPassowordRequest, signUpUserDetails } from '../helper/handleAPI';
import { useNavigate } from 'react-router-dom';
import AuthBaseContainer from '../Components/BaseContainer/AuthBaseContainer';
import { Player } from '@lottiefiles/react-lottie-player';

export default function SignUp() {
  const { updateValidation, onSubmitValidation } = useFormValidation();
  // State : Handles submissions
  const [submitUserDetails, setsubmitUserDetails] = useState(false);

  //State : Displaying errors to the user
  const [errorMsgs, setErrorMsgs] = useState({});

  const navHandler = useNavigate();

  const navToLogin = () => navHandler('/newPassword');

  const emailInputState = useInput(
    {
      id: 'emailValue',
      errorMessage: 'Please enter valid email',
      value: ''
    },
    [required, emailValidator],
    updateValidation
  );
  const userNameInputState = useInput(
    {
      id: 'username',
      errorMessage: 'Please enter valid user name',
      value: ''
    },
    [required],
    updateValidation
  );

  // Provides the error messages to the user
  const renderErrorMgs = (userInput) =>
    userInput === errorMsgs.name && (
      <div className="error">{errorMsgs.message}</div>
    );

  const onSubmitClickHandler = async (event) => {
    event.preventDefault();
    const { isValid } = onSubmitValidation();
    if (isValid) {
      const userDetails = {
        username: userNameInputState.value,
        email: emailInputState.value
      };

      // Initiates the API request to server and returns the respone_data
      try {
        const responseData = await forgotPassowordRequest(userDetails);
        console.log(responseData);
        if (responseData.token) {
          console.log(responseData);
          setsubmitUserDetails(true);
        }
      } catch (err) {
        setErrorMsgs({
          name: 'sendAlert',
          message: err.message
        });
      }
    }
  };

  const emailGIF = (
    <div>
      <Player
        src="https://assets2.lottiefiles.com/packages/lf20_nxkmi9um.json"
        autoplay
        loop
        style={{ height: '400px', width: '400px' }}
      ></Player>
      <div className="checkMail"> Please check your mail </div>
    </div>
  );

  const renderUserDetails = (
    <form>
      <Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_b0lj6sfx.json"
        style={{ height: '200px', width: '200px' }}
      />
      <div className="column_flex">
        <Input id="emailValue" label="Email" inputState={emailInputState} />
        <Input
          id="username"
          label="myNortheastern Username"
          inputState={userNameInputState}
        />
      </div>
      {renderErrorMgs('sendAlert')}
      <div className="button-container">
        <input
          onClick={onSubmitClickHandler}
          type="submit"
          value="Submit"
          className="submitButton"
        />
      </div>
    </form>
  );

  return (
    <div className="column_flex">
      <div className="forgetPassword column_flex align-center">
        <div>
          <h2>Forgot Password</h2>
        </div>
        {submitUserDetails ? emailGIF : renderUserDetails}
      </div>
    </div>
  );
}
