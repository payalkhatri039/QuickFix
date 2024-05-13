import React from "react";
import { emailValidator, required } from "../../helper";
import useFormValidation from "../../hooks/useFormValidation";
import useInput from "../../hooks/useInput";
import Input from "../Input";

export default function Login() {
  const { updateValidation, onSubmitValidation } = useFormValidation();
  const userNameInputState = useInput(
    {
      id: "inputValue",
      errorMessage: "Please enter valid username",
      value: "",
    },
    [required, emailValidator],
    updateValidation
  );
  const passwordInputState = useInput(
    {
      id: "password",
      errorMessage: "Please enter valid password",
      value: "",
    },
    [required],
    updateValidation
  );

  const onSubmitClickHandler = () => {
    onSubmitValidation();
  };
  return (
    <div className="home">
      <Input id="inputValue" label="Username" inputState={userNameInputState} />
      <Input id="password" label="Password" inputState={passwordInputState} />
      <button onClick={onSubmitClickHandler}>Submit</button>
    </div>
  );
}
