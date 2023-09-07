import * as yup from 'yup';

export const contentCreatorValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
