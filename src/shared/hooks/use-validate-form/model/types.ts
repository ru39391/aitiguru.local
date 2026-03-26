export type TInputErrors = Partial<Record<string, string>>;

export type TPwdData = Partial<Record<string, string>>;


export type TValidateForm = Record<"validateEmailField" |
  "validateNumberField" |
  "validatePlainField" |
  "validatePwdField" |
  "validateConfirmPwdField" |
  "unsetInvalidData", (event: Event) => void> & {
  inputErrors: TInputErrors;
  isBtnDisabled: boolean;
  pwdData: TPwdData;
  resetFieldValue: (input: HTMLInputElement | null) => void;
  togglePwdField: (input: HTMLInputElement | null) => void;
};
