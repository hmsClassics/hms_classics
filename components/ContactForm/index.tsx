'use client'

import cx from 'classnames'
import { z } from 'zod'

import styles from './contact_form.module.scss'
import { ContactFormSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sendEmail } from '@/app/_actions'
import InputField from '../InputField'
import SubmitButton from '../SubmitButton'

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
          <InputField
            label="Name"
            name="name"
            type="text"
            required={register}
            error={errors.name}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            required={register}
            error={errors.email}
          />

          <InputField
            label="Message"
            name="message"
            type="textarea"
            required={register}
            error={errors.message}
          />

          <SubmitButton isSubmitting={isSubmitting} contextStyles={styles} />
        </form>
      </div>
    </div>
  )
}
