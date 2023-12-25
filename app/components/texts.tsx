import { Flex, Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

export function TitleText(props: HeadingProps) {
  return (
    <Heading
      fontWeight={600}
      fontSize={'4xl'}
      textTransform="uppercase"
      {...props}
    />
  );
}

export function SubtitleText(props: TextProps) {
  return <Text color="gray.500" {...props} />;
}

export function SectionText(props: TextProps) {
  return (
    <Text
      fontSize="2xl"
      color="black.500"
      fontWeight="bold"
      textTransform="uppercase"
      {...props}
    />
  );
}

export function FormLabelText(props: TextProps) {
  return <Text alignSelf="center" fontWeight={'bold'} {...props} />;
}

export function FormValueText(props: TextProps) {
  return <Text alignSelf="center" {...props} />;
}

export interface TotalValueRowProps {
  label: string;
  value: string;
}

export function SmallTotalValueRow({ label, value }: TotalValueRowProps) {
  return (
    <Flex justify="space-between">
      <Text fontSize="xl" fontWeight={'bold'}>
        {label}
      </Text>
      <Text fontSize="xl">{value}</Text>
    </Flex>
  );
}

export function BigTotalValueRow({ label, value }: TotalValueRowProps) {
  return (
    <Flex justify="space-between">
      <Text fontSize="3xl" fontWeight={'bold'}>
        {label}
      </Text>
      <Text fontSize="3xl" fontWeight={'bold'}>
        {value}
      </Text>
    </Flex>
  );
}
