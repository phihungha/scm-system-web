import { Checkbox, HStack } from '@chakra-ui/react';

export interface IconCheckboxProps {
  icon: React.ReactNode;
  children: React.ReactNode;
  id: string;
  name: string;
  value: string;
}

export function IconCheckbox(props: IconCheckboxProps) {
  return (
    <Checkbox size="lg" id={props.id} name={props.name} value={props.value}>
      <HStack spacing={2}>
        {props.icon}
        {props.children}
      </HStack>
    </Checkbox>
  );
}
