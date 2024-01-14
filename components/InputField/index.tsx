import P from '../Typography/Paragraph'
import styles from './input_field.module.scss'

type InputFieldProps = {
  label: string
  name: string
  type: string
  required: any
  error: any
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  required,
  error,
}) => {
  return (
    <label htmlFor={name} className={styles.label}>
      <span className={styles.label__text}>{label}</span>
      {type === 'textarea' ? (
        <textarea
          {...required(name, { required: true })}
          className={styles.textarea}
        />
      ) : (
        <input
          type={type}
          {...required(name, { required: true })}
          className={styles.input}
        />
      )}
      {error && <P extraClass={styles.input__error}>{error.message}</P>}
    </label>
  )
}

export default InputField
