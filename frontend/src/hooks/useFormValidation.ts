import { useRef } from 'react';

export default function useFormValidation() {
  const inputList = useRef(new Map());

  const updateValidation = (id: string, validator: () => boolean) => {
    inputList.current.set(id, validator);
  };
  const onSubmitValidation = () => {
    let isValid = true;
    let firstErrorId = '';
    inputList.current.forEach((validator, id) => {
      if (!validator()) {
        if (isValid) {
          firstErrorId = id;
        }
        isValid = false;
      }
    });
    return { isValid, firstErrorId };
  };

  return {
    updateValidation,
    onSubmitValidation
  };
}
