'use client'

import cx from 'classnames'
import { z } from 'zod'

import styles from './contact_form.module.scss'
import { ContactFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sendEmail } from '@/app/_actions'
import P from '@components/Typography/Paragraph'

type Inputs = z.infer<typeof ContactFormSchema>
type Result = {
  success: boolean
  data?: Inputs
  error?: Error
}
type FormStateClass = 'form__idle' | 'form__submitting' | 'form__submitted'

export default function ContactForm() {
  const [data, setData] = useState<Inputs>()
  const [formState, setFormState] = useState<FormStateClass>('form__idle')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
  })

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setFormState('form__submitting')
    const result = (await sendEmail(data)) as Result

    if (result?.success) {
      console.log({ data: result.data })
      setData(result.data)
      setFormState('form__submitted')
      reset()
      return
    }

    console.log(result?.error)
    setFormState('form__idle')
    return
  }

  return (
    <div
      className={cx(styles.contact_form, {
        [styles.contact_form__submitting]:
          isSubmitting || formState === 'form__submitting',
        [styles.contact_form__submitted]: formState === 'form__submitted',
        [styles.contact_form__idle]: formState === 'form__idle',
      })}>
      <div className={styles.contact_form__wrapper}>
        <form onSubmit={handleSubmit(processForm)} className={cx(styles.form)}>
          <label htmlFor="name" className={cx([styles.name, styles.label])}>
            <span className={styles.labelText}>Name</span>
            <input type="text" {...register('name', { required: true })} />

            {errors.name?.message && (
              <P extraClass={styles.errorMsg}>{errors.name.message}</P>
            )}
          </label>

          <label htmlFor="email" className={cx([styles.email, styles.label])}>
            <span className={styles.labelText}>Email</span>
            <input type="email" {...register('email', { required: true })} />

            {errors.email?.message && (
              <P extraClass={styles.errorMsg}>{errors.email.message}</P>
            )}
          </label>

          <label
            htmlFor="message"
            className={cx([styles.message, styles.label])}>
            <span className={styles.labelText}>Message</span>
            <textarea
              {...register('message', { required: true })}
              className={styles.message}
            />

            {errors.message?.message && (
              <P extraClass={styles.errorMsg}>{errors.message.message}</P>
            )}
          </label>

          <button
            className={cx(styles.submit, { [styles.disabled]: isSubmitting })}
            disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
