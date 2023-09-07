import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  content_creator_id: yup.string().nullable().required(),
});
