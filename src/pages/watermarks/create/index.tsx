import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createWatermark } from 'apiSdk/watermarks';
import { watermarkValidationSchema } from 'validationSchema/watermarks';
import { AdministratorInterface } from 'interfaces/administrator';
import { getAdministrators } from 'apiSdk/administrators';
import { WatermarkInterface } from 'interfaces/watermark';

function WatermarkCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WatermarkInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWatermark(values);
      resetForm();
      router.push('/watermarks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WatermarkInterface>({
    initialValues: {
      design: '',
      placement: '',
      administrator_id: (router.query.administrator_id as string) ?? null,
    },
    validationSchema: watermarkValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Watermarks',
              link: '/watermarks',
            },
            {
              label: 'Create Watermark',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Watermark
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.design}
            label={'Design'}
            props={{
              name: 'design',
              placeholder: 'Design',
              value: formik.values?.design,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.placement}
            label={'Placement'}
            props={{
              name: 'placement',
              placeholder: 'Placement',
              value: formik.values?.placement,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<AdministratorInterface>
            formik={formik}
            name={'administrator_id'}
            label={'Select Administrator'}
            placeholder={'Select Administrator'}
            fetcher={getAdministrators}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/watermarks')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'watermark',
    operation: AccessOperationEnum.CREATE,
  }),
)(WatermarkCreatePage);
