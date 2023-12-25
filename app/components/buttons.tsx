import { Button, ButtonProps } from '@chakra-ui/react';

export function ActionButton(props: ButtonProps) {
  return <Button width={100} variant="solid" size="lg" {...props} />;
}
