import type { FocusEvent, ChangeEvent } from "react";

export type TInputErrors = Partial<Record<string, string>>;

export type TPwdData = Partial<Record<string, string>>;

export type TValidateForm = Record<"validateEmailField" |
  "validateNumberField" |
  "validatePlainField", (event: FocusEvent<HTMLInputElement, Element>) => void>
  & Record<"validateConfirmPwdField" |
  "unsetInvalidData", (event: ChangeEvent<HTMLInputElement>) => void
  > & {
  inputErrors: TInputErrors;
  isBtnDisabled: boolean;
  pwdData: TPwdData;
  validatePwdField: (event: FocusEvent<HTMLInputElement, Element> | ChangeEvent<HTMLInputElement>) => void;
  resetFieldValue: (input: HTMLInputElement | null) => void;
  togglePwdField: (input: HTMLInputElement | null) => void;
};
