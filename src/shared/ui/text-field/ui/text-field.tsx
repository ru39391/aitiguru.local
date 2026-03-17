import { forwardRef, useRef, type FC } from "react";
import type { ITextField, ITextFieldInput } from "../model/types";
import styles from './text-field.module.css';

const TextFieldInput = forwardRef<HTMLInputElement, ITextFieldInput>(({
  defaultValue,
  handleBlur,
  handleChange,
  handleFocus,
  isRequired,
  name,
  type
}, ref) => {
  return (
    <input
      ref={ref}
      id={name}
      name={name}
      className={`${styles.field__input} ${styles.field__label}`}
      type={type || "text"}
      {...(defaultValue && { defaultValue })}
      {...(handleBlur && { onBlur: handleBlur })}
      {...(handleChange && { onChange: handleChange })}
      {...(handleFocus && { onFocus: handleFocus })}
      {...(isRequired && { required: isRequired })}
    />
  );
});

const TextField: FC<ITextField> = ({
  children,
  defaultValue,
  errorValue,
  handleBlur,
  handleChange,
  handleFieldValue,
  handleFocus,
  icon,
  isBtnVisible,
  isRequired,
  label,
  name,
  type
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fieldClassName = errorValue ? `${styles.field} ${styles.field_type_error}` : styles.field;
  const rowClassName = icon ? `${styles.field__row} ${styles.field__row_offset_y}` : styles.field__row;
  const input = (
    <TextFieldInput
      ref={inputRef}
      {...{
        defaultValue,
        handleBlur,
        handleChange,
        handleFocus,
        isRequired,
        name,
        type
      }}
    />
  );

  return (
    <div className={fieldClassName}>
      {Boolean(label) && <label className={styles.field__label}>{label}</label>}
      <div className={rowClassName}>
        {icon ? (<><div className={styles.field__icon}>{icon}</div>{input}</>) : input}
        {handleFieldValue &&
          <button
            className={isBtnVisible ? `${styles.field__btn} ${styles.field__btn_visible}` : styles.field__btn}
            onClick={() => handleFieldValue(inputRef.current)}
            type="button"
          >
            {children}
          </button>
        }
        <div className={styles.field__error}>{errorValue}</div>
      </div>
    </div>
  )
};

export default TextField;
