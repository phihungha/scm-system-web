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
  return (
    <Button width={200} variant="solid" {...props}>
      {props.isLoading ? <ButtonSpinner /> : props.children}
    </Button>
  );
}

export interface ActionButtonRowProps extends ButtonProps {
  buttonText: string;
}

export function ActionButtonRow({
  buttonText,
  ...props
}: ActionButtonRowProps) {
  return (
    <HStack spacing={6} alignItems="center">
      <ActionButton {...props}>{buttonText}</ActionButton>
      <Text>{props.children}</Text>
    </HStack>
  );
}

export function ActionButtonSection(props: StackProps) {
  return <Stack spacing={3} {...props} />;
}
