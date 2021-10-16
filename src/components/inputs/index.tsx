import React, { InputHTMLAttributes } from "react"
import MaskInput from "react-maskinput"
import { ErrorIcon } from "assets/icons"

import styles from "./inputs.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errors?: string[]
}

const ErrorMessage = ({ errors }: { errors: string[] }) => {
  const isErrorHas = errors?.length > 0

  return isErrorHas ? (
    <div className={styles.errorMessage}>
      <span>
        <ErrorIcon fontSize={22} />
      </span>
      {errors.map((err) => (
        <div key={err}>{err}</div>
      ))}
    </div>
  ) : null
}

export function Input(props: InputProps) {
  const { errors = [], className, ...rest } = props
  const isErrorHas = errors?.length > 0

  return (
    <div>
      <input
        className={`${className} ${styles.input} ${
          isErrorHas ? styles.errored : ""
        }`}
        spellCheck={false}
        {...rest}
      />
      <ErrorMessage errors={errors} />
    </div>
  )
}

export function MaskedInput(props: InputProps) {
  const { errors = [], ...rest } = props
  const isErrorHas = errors?.length > 0

  return (
    <div>
      {/* @ts-ignore */}
      <MaskInput
        mask={"(000)000-00-00"}
        showMask
        maskChar="_"
        className={`${styles.input} ${isErrorHas ? styles.errored : ""}`}
        {...rest}
      />
      <ErrorMessage errors={errors} />
    </div>
  )
}
