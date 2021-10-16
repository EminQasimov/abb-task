import React, { InputHTMLAttributes } from "react"
import styles from "./input.module.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return <input className={styles.input} {...props} />
}
