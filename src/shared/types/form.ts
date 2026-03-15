export type TFormState<T> = Partial<{ values: T; message: string; }>;

export type TFormAction<T> = (
  state: TFormState<T>,
  formData: FormData,
) => Promise<TFormState<T>>;

export type TFormHandler<T> = {
  formState: TFormState<T>;
  dispatchForm: (data: FormData) => void;
  isPending: boolean;
}
