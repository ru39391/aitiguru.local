import { useState } from "react";
import {
  FORM_ERRORS,
  PWD_VALUE_LENGTH,
  TEXT_VALUE_LENGTH
} from "@/shared/constants";
import type { TInputErrors, TPwdData, TValidateForm } from "../model/types";

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

  const validateNumberField = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;
    const numValue = parseFloat(value);
    const isValueValid = value.length > 0 && numValue > 0 && !isNaN(numValue);

    setInputErrors({
      ...inputErrors,
      ...(!isValueValid && { [name]: value.length === 0 ? FORM_ERRORS.required : FORM_ERRORS.num })
    });
  }

  const validatePlainField = (event: Event) => {
    const { name, value } = event.target as HTMLInputElement;

    setInputErrors({
      ...inputErrors,
      ...(value.length < TEXT_VALUE_LENGTH && { [name]: value.length === 0 ? FORM_ERRORS.required : `${FORM_ERRORS.min} ${TEXT_VALUE_LENGTH} символов` })
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
    const isPwdExist = pwdData[name] && pwdData[name].length >= PWD_VALUE_LENGTH;
    const isConfPwdExist = pwdData[key] && pwdData[key].length >= PWD_VALUE_LENGTH;
    const errorMsg = isPwdExist && isConfPwdExist && pwdData[name] !== pwdData[key] ? FORM_ERRORS.pwd : "";

    setInputErrors({
      ...inputErrors,
      ...(
        value.length < PWD_VALUE_LENGTH
          ? { [name]: value.length === 0 ? FORM_ERRORS.required : `${FORM_ERRORS.min} ${PWD_VALUE_LENGTH} символов` }
          : { [name]: errorMsg, [key]: errorMsg }
      )
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

  const resetFieldValue = (input: HTMLInputElement | null) => {
    if(!input) {
      return;
    }

    input.value = "";
    setInputErrors(
      Object.entries(inputErrors).reduce(
        (acc, [key, value]) => (key === input.name ? acc : { ...acc, [key]: value }),
        {}
      )
    );
  }

  const togglePwdField = (input: HTMLInputElement | null) => {
    if(!input) {
      return;
    }

    input.type = input.type === "text" ? "password" : "text";
  }

  return {
    inputErrors,
    isBtnDisabled: handleBtnDisabled(),
    pwdData,
    resetFieldValue,
    togglePwdField,
    validateEmailField,
    validateNumberField,
    validatePlainField,
    validatePwdField,
    validateConfirmPwdField,
    unsetInvalidData
  };
};
