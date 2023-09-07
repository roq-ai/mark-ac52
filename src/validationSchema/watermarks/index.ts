import * as yup from 'yup';

export const watermarkValidationSchema = yup.object().shape({
  design: yup.string().required(),
  placement: yup.string().required(),
  administrator_id: yup.string().nullable().required(),
});
