import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

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
  return <Text fontWeight={'bold'} {...props} />;
}

export function FormValueText(props: TextProps) {
  return <Text {...props} />;
}
