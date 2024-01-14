import cx from 'classnames'

import styles from './submit_button.module.scss'

type SubmitButtonProps = {
  isSubmitting: boolean
  contextStyles: any
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  contextStyles,
}) => {
  return (
    <button
      className={cx(styles.submit_button, contextStyles.submit)}
      disabled={isSubmitting}>
      {isSubmitting ? 'Sending...' : 'Send'}
    </button>
  )
}

export default SubmitButton
