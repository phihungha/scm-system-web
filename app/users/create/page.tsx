'use client';

import { uploadFile } from '@/app/api/file-upload';
import { getProductionFacilities } from '@/app/api/production-facility';
import { createUser, getUserImageUploadInfo } from '@/app/api/user';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import ImageSelector from '@/app/components/image-selector';
import { NormalSpinner } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { UserCreateParams } from '@/app/models/user';
import { showFailToast, showSuccessToast } from '@/app/utils/toast-messages';
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { object, string } from 'yup';
import RolePanel from '../components/RolePanel';

export default function UserCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const { mutate: createItem, isLoading: isCreateLoading } = useMutation(
    createUser,
    {
      onSuccess: (resp) => {
        showSuccessToast(toast, { title: 'Item successfully created' });
        router.push(resp.id.toString());
      },
    },
  );

  const [imageFile, setImageFile] = useState<File | null | undefined>();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onSubmit = async (input: UserCreateParams) => {
    let imageName = undefined;

    if (imageFile) {
      const uploadInfo = await getUserImageUploadInfo();

      setIsImageUploading(true);
      const resp = await uploadFile(uploadInfo.uploadUrl, imageFile);
      setIsImageUploading(false);

      if (!resp.ok) {
        return showFailToast(toast, { title: 'Failed to upload image.' });
      }

      setImageFile(undefined);
      imageName = uploadInfo.name;
    }

    createItem({ ...input, imageName });
  };

  const isLoading = isCreateLoading || isImageUploading;

  const { data: facilities } = useQuery({
    queryKey: ['productionFacilities'],
    queryFn: () => getProductionFacilities(),
  });

  const initialFormValues: UserCreateParams = {
    address: '',
    imageName: undefined,
    dateOfBirth: '2000-01-01',
    description: '',
    email: 'john.doe@gmail.com',
    gender: 'Male',
    idCardNumber: '',
    name: '',
    phoneNumber: '',
    roles: [],
    productionFacilityId: undefined,
    userName: '',
    password: '',
    isActive: true,
  };

  const formValidationSchema = object({
    address: string().label('Address').optional(),
    dateOfBirth: string().label('Date of birth').required(),
    description: string().label('Description').optional(),
    email: string().label('Email').required().email(),
    idCardNumber: string().label('ID Card Number').required().length(12),
    name: string().label('Name').required(),
    phoneNumber: string().label('Phone number').required().length(10),
    userName: string().label('Username').required().min(5),
    password: string().label('Password').required().min(8),
  });

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Create user</TitleText>
        <SubtitleText>
          Create a new user. Please enter the information below.
        </SubtitleText>

        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, touched, values, setFieldValue }) => (
            <form method="POST" onSubmit={handleSubmit}>
              <Flex gap={45}>
                <ImageSelector
                  size={250}
                  file={imageFile}
                  onSelect={setImageFile}
                />

                <Stack spacing={5} flex={1}>
                  <FormControl
                    isInvalid={!!errors.userName && touched.userName}
                  >
                    <FormLabel htmlFor="userName">Username</FormLabel>
                    <Field
                      as={Input}
                      id="userName"
                      name="userName"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.userName}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Field
                      as={Input}
                      type="password"
                      id="password"
                      name="password"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.name && touched.name}>
                    <FormLabel htmlFor="name">Full name</FormLabel>
                    <Field as={Input} id="name" name="name" variant="filled" />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Gender</FormLabel>
                    <Field as={Select} name="gender">
                      <option value="Male">Male</option>
                      <option value="Female">Male</option>
                      <option value="Other">Other</option>
                    </Field>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email && touched.email}>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.phoneNumber && touched.phoneNumber}
                  >
                    <FormLabel htmlFor="phoneNumber">Phone number</FormLabel>
                    <Field
                      as={Input}
                      id="phoneNumber"
                      name="phoneNumber"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.phoneNumber}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.dateOfBirth && touched.dateOfBirth}
                  >
                    <FormLabel htmlFor="dateOfBirth">Date of birth</FormLabel>
                    <Field
                      as={Input}
                      id="dateOfBirth"
                      name="dateOfBirth"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.dateOfBirth}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.idCardNumber && touched.idCardNumber}
                  >
                    <FormLabel htmlFor="idCardNumber">ID Card Number</FormLabel>
                    <Field
                      as={Input}
                      id="idCardNumber"
                      name="idCardNumber"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.idCardNumber}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel htmlFor="productionFacilityId">
                      Production facility:
                    </FormLabel>
                    {facilities ? (
                      <AutoCompleteSelect
                        name="productionFacilityId"
                        items={facilities}
                        value={values.productionFacilityId}
                        placeholder="Select a production facility this user belongs to..."
                        onChange={(i) =>
                          setFieldValue('productionFacilityId', i)
                        }
                      />
                    ) : (
                      <NormalSpinner />
                    )}
                    <FormErrorMessage>
                      {errors.productionFacilityId}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors.description && touched.description}
                  >
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <Field
                      as={Textarea}
                      id="description"
                      name="description"
                      variant="filled"
                    />
                    <FormErrorMessage>{errors.description}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <HStack spacing={2}>
                      <Field type="checkbox" id="isActive" name="isActive" />
                      <Text>Active</Text>
                    </HStack>
                  </FormControl>

                  <FormControl isInvalid={values.roles.length < 1}>
                    <FormLabel htmlFor="roles">Roles</FormLabel>
                    <RolePanel />
                    <FormErrorMessage>
                      {values.roles.length < 1 && 'User needs at least 1 role'}
                    </FormErrorMessage>
                  </FormControl>

                  <Flex justify="end" mt={5} gap={5}>
                    <Link href="/supplies">
                      <ActionButton size="lg">Close</ActionButton>
                    </Link>

                    <ActionButton
                      type="submit"
                      size="lg"
                      colorScheme="blue"
                      isLoading={isLoading}
                    >
                      Create
                    </ActionButton>
                  </Flex>
                </Stack>
              </Flex>
            </form>
          )}
        </Formik>
      </Stack>
    </Stack>
  );
}
