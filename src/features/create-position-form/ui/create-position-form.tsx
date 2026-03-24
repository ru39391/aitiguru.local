import { type FC } from "react";
import { Form } from "@/entities/form";
import { Button, TextField } from "@/shared/ui";
import { CloseIcon } from "@/shared/icons";
import { Loader } from "@/shared/ui";
import { usePositionStore } from "@/entities/position";
import { useValidateForm } from "@/shared/hooks";
import { useCreatePosition } from "../hooks/use-create-position";
import type { ITextFieldInput } from "@/shared/ui/text-field";

const CreatePositionForm: FC = () => {
  const { formState, dispatchForm, isPending } = useCreatePosition();
  const { current: position } = usePositionStore();
  const {
    inputErrors,
    isBtnDisabled,
    resetFieldValue,
    validateNumberField,
    validatePlainField,
    unsetInvalidData
  } = useValidateForm();

  return (
    <Form
      action={dispatchForm}
      title={`${position ? "Редактировать" : "Добавить"} товар`}
      isLogoVisible={false}
      mod={["md", "grid"]}
      type="grid"
    >
      {[
        {
          name: "name",
          label: "Название",
          defaultValue: formState?.values?.name || position?.name || "",
        },
        {
          name: "category",
          label: "Категория",
          defaultValue: formState?.values?.category || position?.category || "",
        },
        {
          name: "vendor",
          label: "Производитель",
          defaultValue: formState?.values?.vendor || position?.vendor || "",
        },
        {
          name: "article",
          label: "Артикул",
          defaultValue: formState?.values?.article || position?.article || "",
        },
        {
          name: "rating",
          label: "Оценка",
          defaultValue: formState?.values?.rating || position?.rating || "",
        },
        {
          name: "price",
          label: "Цена, руб.",
          defaultValue: formState?.values?.price || position?.price || "",
        },
      ].map(({
        defaultValue,
        label,
        name
      }) => (
        <TextField
          key={name}
          isRequired
          {...{
            defaultValue,
            errorValue: inputErrors[name] || "",
            isBtnVisible:  inputErrors[name] !== undefined,
            name,
            label,
            type: "text",
            handleBlur: ["rating", "price"].includes(name)
              ? validateNumberField as ITextFieldInput["handleBlur"]
              : validatePlainField as ITextFieldInput["handleBlur"],
            handleChange: unsetInvalidData,
            handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input)
          }}
        >
          <CloseIcon />
        </TextField>
      ))}
      <Button
        caption={!isPending ? "Сохранить" : ""}
        isDisabled={isPending || isBtnDisabled}
        type="submit"
      >
        <Loader isVisible={isPending} size="xs" />
      </Button>
    </Form>
  )
};

export default CreatePositionForm;
