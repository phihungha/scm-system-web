'use client';

import { uploadFile } from '@/app/api/file-upload';
import { getProductionFacilities } from '@/app/api/production-facility';
import { getUser, getUserImageUploadInfo, updateUser } from '@/app/api/user';
import { AutoCompleteSelect } from '@/app/components/auto-complete';
import { ActionButton } from '@/app/components/buttons';
import ImageSelector from '@/app/components/image-selector';
import { LoadingPage, NormalSpinner } from '@/app/components/spinners';
import { SubtitleText, TitleText } from '@/app/components/texts';
import { UserUpdateParams } from '@/app/models/user';
import { DetailsPageProps } from '@/app/types/page-props';
import { showFailToast, showSuccessToast } from '@/app/utils/toast-messages';
import {
  Checkbox,
  CheckboxGroup,
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
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { object, string } from 'yup';
import RolePanel from '../components/RolePanel';

export default function UserUpdatePage({ params }: DetailsPageProps<string>) {
  const itemId = params.id;

  const queryClient = useQueryClient();
  const toast = useToast();

  const queryKey = ['users', itemId];

  const { data: item } = useQuery({
    queryKey,
    queryFn: () => getUser(itemId),
  });

  const { mutate: updateItem, isLoading: isUpdateLoading } = useMutation(
    updateUser,
    {
      onSuccess: (resp) => {
        queryClient.setQueryData(queryKey, resp);
        showSuccessToast(toast, { title: 'Update succeed!' });
      },
    },
  );

  const [imageFile, setImageFile] = useState<File | null | undefined>();
  const [isImageUploading, setIsImageUploading] = useState(false);

  const onSubmit = async (input: UserUpdateParams) => {
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
    } else if (imageFile === null) {
      imageName = undefined;
      setImageFile(undefined);
    }

    updateItem({ ...input, id: itemId, imageName });
  };

  const isLoading = isUpdateLoading || isImageUploading;

  const { data: facilities } = useQuery({
    queryKey: ['productionFacilities'],
    queryFn: () => getProductionFacilities(),
  });

  if (item === undefined) {
    return <LoadingPage />;
  }

  const initialFormValues: UserUpdateParams = {
    id: item.id,
    address: item.address,
    imageName: item.imageName,
    dateOfBirth: item.dateOfBirth,
    description: item.description,
    email: item.email,
    gender: item.gender,
    idCardNumber: item.idCardNumber,
    name: item.name,
    phoneNumber: item.phoneNumber,
    roles: item.roles,
    productionFacilityId: item.productionFacilityId,
    userName: item.userName,
    isActive: item.isActive,
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
  });

  return (
    <Stack p={5} spacing={5}>
      <Stack spacing={5}>
        <TitleText>Update user</TitleText>
        <SubtitleText>Manage and view the details of this user.</SubtitleText>

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
                  url={item.imageUrl}
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
                      <Checkbox
                        size="lg"
                        isChecked={values.isActive}
                        onChange={(i) =>
                          setFieldValue('isActive', i.target.checked)
                        }
                      />
                      <Text>Active</Text>
                    </HStack>
                  </FormControl>

                  <FormControl isInvalid={values.roles.length < 1}>
                    <FormLabel htmlFor="roles">Roles</FormLabel>
                    <CheckboxGroup
                      value={values.roles}
                      onChange={(i) => setFieldValue('roles', i)}
                    >
                      <RolePanel />
                    </CheckboxGroup>
                    <FormErrorMessage>
                      {values.roles.length < 1 && 'User needs at least 1 role'}
                    </FormErrorMessage>
                  </FormControl>

                  <Flex justify="end" mt={5} gap={5}>
                    <Link href="/users">
                      <ActionButton size="lg">Close</ActionButton>
                    </Link>

                    <ActionButton
                      type="submit"
                      size="lg"
                      colorScheme="blue"
                      isLoading={isLoading}
                    >
                      Update
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
