'use client';

import {
  Button,
  ButtonProps,
  HStack,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';
import { ButtonSpinner } from './spinners';

export function ActionButton(props: ButtonProps) {
  return <Button width={200} variant="solid" {...props} />;
}

export interface ActionButtonRowProps extends ButtonProps {
  buttonText: string;
  isLoading?: boolean;
}

export function ActionButtonRow(props: ActionButtonRowProps) {
  return (
    <HStack spacing={6} alignItems="center">
      <ActionButton {...props}>
        {props.isLoading ? <ButtonSpinner /> : props.buttonText}
      </ActionButton>
      <Text>{props.children}</Text>
    </HStack>
  );
}

export function ActionButtonSection(props: StackProps) {
  return <Stack spacing={3} {...props} />;
}
