import { useState } from "react";
import { FORM_ERRORS } from "@/shared/constants";

type TInputErrors = Partial<Record<string, string>>;

type TPwdData = Partial<Record<string, string>>;

type TValidateForm = Record<"validateEmailField" |
  "validatePlainField" |
  "validatePwdField" |
  "validateConfirmPwdField" |
  "unsetInvalidData", (event: Event) => void> & {
  inputErrors: TInputErrors;
  isBtnDisabled: boolean;
  pwdData: TPwdData;
};

export const useValidateForm = (): TValidateForm => {
  const [inputErrors, setInputErrors] = useState<TInputErrors>({});
  const [pwdData, setPwdData] = useState<TPwdData>({});

  const unsetInvalidData = (event: Event) => {
    const { name } = event.target as HTMLInputElement;

    setInputErrors({
      ...inputErrors,
      [name]: ""
    });
  }

  const validatePlainField = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;

    setInputErrors({
      ...inputErrors,
      ...(value.length < 3 && { [name]: value.length === 0 ? FORM_ERRORS.required : `${FORM_ERRORS.min} 3 символов` })
    });
  }

  const validateEmailField = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidValue = emailRegex.test(value);

    setInputErrors({
      ...inputErrors,
      ...(!isValidValue && { [name]: value.length === 0 ? FORM_ERRORS.required : FORM_ERRORS.email })
    });
  }

  const validatePwdField = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    const key = name === "password" ? "confirm_password" : "password";
    const isPwdExist = pwdData[name] && pwdData[name].length >= 8;
    const isConfPwdExist = pwdData[key] && pwdData[key].length >= 8;
    const errorMsg = isPwdExist && isConfPwdExist && pwdData[name] !== pwdData[key] ? FORM_ERRORS.pwd : "";

    setInputErrors({
      ...inputErrors,
      ...(value.length < 8 ? { [name]: value.length === 0 ? FORM_ERRORS.required : `${FORM_ERRORS.min} 8 символов` } : { [name]: errorMsg, [key]: errorMsg })
    });
  }

  const validateConfirmPwdField = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;

    setPwdData({
    ...pwdData,
      [name]: value
    });

    validatePwdField(event);
  }

  const handleBtnDisabled = (): boolean => Object.values(inputErrors).reduce((acc, value) => acc || Boolean(value), false);

  return {
    inputErrors,
    isBtnDisabled: handleBtnDisabled(),
    pwdData,
    validateEmailField,
    validatePlainField,
    validatePwdField,
    validateConfirmPwdField,
    unsetInvalidData
  };
};
