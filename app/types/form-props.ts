import { FormikErrors, FormikTouched } from 'formik';

export interface FormInputsProps<TValues> {
  errors: FormikErrors<TValues>;
  touched: FormikTouched<TValues>;
}
