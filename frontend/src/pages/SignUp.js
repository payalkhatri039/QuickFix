import { useState } from 'react';
import '../styles/SignIn-Up/signIn-Up.scss';
import { emailValidator, required } from '../helper/index';
import useFormValidation from '../hooks/useFormValidation';
import useInput from '../hooks/useInput';
import Input from '../Components/Input/index';
import { signUpUserDetails } from '../helper/handleAPI';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import AuthBaseContainer from '../Components/BaseContainer/AuthBaseContainer';

/**
 * Description: The page renders the Sign Up of a new user. Consists of the fields :
 * 1. First Name
 * 2. Last Name
 * 3. User Name
 * 4. Password
 * 5. Email
 * 6. User Type
 */
export default function SignUp() {
  const { updateValidation, onSubmitValidation } = useFormValidation();

  //State : Displaying errors to the user
  const [errorMsgs, setErrorMsgs] = useState({});

  const navHandler = useNavigate();

  const navToLogin = () => navHandler('/login');

  /**
   * Employs useInput hook where we pass id, an errorMessage and initial value, and the
   * validation required
   */

  const firstNameInputState = useInput(
    {
      id: 'firstName',
      errorMessage: 'Please enter valid first name',
      value: ''
    },
    [required],
    updateValidation
  );
  const lastNameInputState = useInput(
    {
      id: 'lastName',
      errorMessage: 'Please enter valid last name',
      value: ''
    },
    [required],
    updateValidation
  );
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
  const passwordInputState = useInput(
    {
      id: 'password',
      errorMessage: 'Please enter valid password',
      value: ''
    },
    [required],
    updateValidation
  );
  const userTypeInputState = useInput(
    {
      id: 'userType',
      errorMessage: '',
      value: 'Student'
    },
    [required],
    updateValidation
  );

  // Provides the error messages to the user
  const renderErrorMgs = (userInput) =>
    userInput === errorMsgs.name && (
      <div className="error">{errorMsgs.message}</div>
    );

  // Checks for the validation, and if approved - initiates the API call to backend
  const onSubmitClickHandler = async (event) => {
    event.preventDefault();
    const { isValid } = onSubmitValidation();
    if (isValid) {
      const userDetails = {
        username: userNameInputState.value,
        password: passwordInputState.value,
        firstName: firstNameInputState.value,
        lastName: lastNameInputState.value,
        email: emailInputState.value,
        userType: userTypeInputState.value
      };

      // Initiates the API request to server and returns the respone_data
      const responseData = await signUpUserDetails(userDetails);
      console.log(responseData);
      if (responseData.token) {
        console.log(responseData);
        navToLogin();
      } else if (responseData.error) {
        setErrorMsgs({
          name: 'sendAlert',
          message: responseData.error.message
        });
      }
    }
  };

  // JSX code for the input of the fields taken from the user
  const renderUserDetails = (
    <div className="form_signup">
      <form>
        <div className="inForm-FN_LN ">
          <Input
            id="firstName"
            label="First Name"
            inputState={firstNameInputState}
          />
          <Input
            id="lastName"
            label="Last Name"
            inputState={lastNameInputState}
          />
        </div>
        <div className="inForm-FN_LN ">
          <Input id="emailValue" label="Email" inputState={emailInputState} />
          <Input
            id="userType"
            label="User Type"
            inputState={userTypeInputState}
          />
        </div>
        <div className="inForm-FN_LN ">
          <Input
            id="username"
            label="myNortheastern Username"
            inputState={userNameInputState}
          />
          <Input
            id="password"
            label="myNortheastern Password"
            inputState={passwordInputState}
            type="password"
          />
        </div>
        {renderErrorMgs('sendAlert')}
        <div className="button-container">
          <input
            onClick={onSubmitClickHandler}
            type="submit"
            value="Sign Up"
            className="submitButton"
          />
        </div>
        <div className="inForm-container">
          <label className="alreadyMemberSignup" onClick={navToLogin}>
            Already a member?
          </label>
        </div>
      </form>
    </div>
  );

  // Renders certain animations - employs react-lottie and calls renderUserDetails
  return (
    <AuthBaseContainer
      styles={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
      }}
    >
      <div className="signUp-Master">
        <div className="titleOfSignUp">
          <h2>Sign Up</h2>
        </div>
        {renderUserDetails}
        <Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/packages/lf20_sycl9imh.json"
          style={{
            height: '200px',
            width: '200px'
          }}
          className="align_center"
        />
      </div>
    </AuthBaseContainer>
  );
}
