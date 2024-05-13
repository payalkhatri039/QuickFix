import { useState } from 'react';
import '../styles/SignIn-Up/signIn-Up.scss';
import '../styles/SignIn-Up/slider.scss';
import { validateUser } from '../helper/handleAPI';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUserDetail } from '../redux/actions/User/actions';
import { setLocalStorageData } from '../helper/AysncStorage';
import AuthBaseContainer from '../Components/BaseContainer/AuthBaseContainer';
import { Player } from '@lottiefiles/react-lottie-player';
import Neu from '../assets/neu.jpeg';
import NeuBookImage from '../assets/neu_book.jpeg';
import Husky from '../assets/husky.jpeg';
import Refresh from '../assets/refresh.jpeg';
import HuskyDog from '../assets/husky_dog.jpeg';

function Login() {
  //State : Displaying errors to the user
  const [errorMsgs, setErrorMsgs] = useState({});

  // State : Handles submissions
  const [submitCreds, setSubmitCreds] = useState(false);

  // State : Handles the password provided by user
  const [password, setPassword] = useState();

  // State : Handles the username provided by user
  const [username, setUsername] = useState();

  // Route purposes used to navigate to different pages
  const navHandler = useNavigate();

  const navToFgtPwd = () => navHandler('/ForgotPassword');

  const navToSignup = () => navHandler('/Signup');

  const navigateToHomePage = () => navHandler('/');

  const dispatch = useDispatch();

  //Validates the submission by user, checks if a token is provided by server or not
  const validateSubmit = async (e) => {
    e.preventDefault();

    // Initiates the API request to server and returns the respone
    const responseData = await validateUser(username, password);

    // Checks if the token was received or not, sets the error-state accordingly
    try {
      if (!responseData.token) {
        setErrorMsgs({
          name: 'sendAlert',
          message: responseData.error.message
        });
      } else {
        dispatch(updateUserDetail(responseData));
        await setLocalStorageData('user', responseData);
        navigateToHomePage();
      }
    } catch (error) {
      return error;
    }
  };

  // Provides the error messages to the user
  const renderErrorMgs = (userInput) =>
    userInput === errorMsgs.name && (
      <div className="error">{errorMsgs.message}</div>
    );

  // Utility to change the username and password state and error state to null
  const changeStates = (event, nameType) => {
    if (nameType === 'uname') {
      setUsername(event.target.value);
    } else if (nameType === 'pass') {
      setPassword(event.target.value);
    }
    setErrorMsgs({});
  };

  // JSX code for the username and password
  const renderForm = (
    <div>
      <div className="inForm-container">
        <label className="formLabels">myNortheastern Username</label>
        <input
          className="loginInput"
          type="text"
          name="uname"
          required
          onChange={(event) => changeStates(event, 'uname')}
        />
      </div>
      <div className="inForm-container" name="sendAlert">
        <label className="formLabels">myNortheastern Password</label>
        <input
          className="loginInput"
          type="password"
          name="pass"
          required
          onChange={(event) => changeStates(event, 'pass')}
        />
        {renderErrorMgs('sendAlert')}
      </div>
      <div className="button-container" onClick={validateSubmit}>
        <input type="submit" value="Log In" className="submitButton" />
      </div>
      <div className="inForm-container_frgtPwd">
        <label className="navToSignup" onClick={navToSignup}>
          Not a member?
        </label>
        <label className="forgetPwd" onClick={navToFgtPwd}>
          Forgot password?
        </label>
      </div>
    </div>
  );

  // renders the slides of certain images on login page - lib : react-lottie
  return (
    <AuthBaseContainer>
      <div className="login_base_container">
        <div className="slide_wrapper">
          <img src={Neu} className="img" alt="img" />
          <img src={HuskyDog} className="img" alt="img" />
          <img src={Refresh} className="img" alt="img" />
          <img src={Husky} className="img" alt="img" />
          <img src={NeuBookImage} className="img" alt="img" />
        </div>
      </div>
      <div className="row_flex login_form_container">
        <Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/packages/lf20_sycl9imh.json"
          style={{ height: '200px', width: '200px' }}
        />
        <div className="login-master">
          <div class="titleOfLogin">
            <h2>Northeastern University</h2>
          </div>
          {submitCreds ? <div>User is successfully logged in</div> : renderForm}
        </div>
        <div className="studentHub" />
      </div>
    </AuthBaseContainer>
  );
}

export default Login;
