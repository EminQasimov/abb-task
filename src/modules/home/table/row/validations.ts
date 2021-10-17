// @ts-nocheck
import * as yup from 'yup'

// non letter symbols regex that user can type on keyboard.
const nonLetterSymbols = /[0-9]|[,~!@#$%^&*()_+{}|":>?<.';/`\]\[=-]|\\/g

// masked input adds _ symbol on empty places. if undescore has, so it is invalid.
const invalidPhone = /_/g

function isAlpha(message: string) {
  return this.test('isAlpha', message, function (value: string) {
    const { path, createError } = this

    if (value.match(nonLetterSymbols)) {
      return createError({
        path,
        message,
      })
    }

    return true
  })
}

function isPhone(message: string) {
  return this.test('isPhone', message, function (value: string) {
    const { path, createError } = this

    if (value.match(invalidPhone)) {
      return createError({
        path,
        message,
      })
    }

    return true
  })
}

yup.addMethod(yup.string, 'isAlpha', isAlpha)
yup.addMethod(yup.string, 'isPhone', isPhone)

export const textSchema = yup
  .string()
  .min(3, 'A minimum of 3 characters is required.')
  .max(40, 'Maximum allowed characters is 40.')
  .isAlpha('Field must contain only letters')
  .required('Please fill out this field.')

export const phoneSchema = yup.string().isPhone('Please fill out this field.')
export const dateSchema = yup.string().required('Please fill out this field.')
