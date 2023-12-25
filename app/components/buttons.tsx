import {
  Button,
  ButtonProps,
  HStack,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';

export function ActionButton(props: ButtonProps) {
  return <Button width={100} variant="solid" size="lg" {...props} />;
}

export interface ActionButtonRowProps extends ButtonProps {
  buttonText: string;
}

export function ActionButtonRow(props: ActionButtonRowProps) {
  return (
    <HStack spacing={6} alignItems="center">
      <Button width={200} variant="solid" {...props}>
        {props.buttonText}
      </Button>
      <Text>{props.children}</Text>
    </HStack>
  );
}

export function ActionButtonSection(props: StackProps) {
  return <Stack spacing={3} {...props} />;
}
