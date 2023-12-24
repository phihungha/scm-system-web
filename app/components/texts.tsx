import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

export function SectionText(props: TextProps) {
  return (
    <Text
      fontSize="3xl"
      color="black.500"
      fontWeight="bold"
      textTransform="uppercase"
      {...props}
    />
  );
}

export function TitleText(props: HeadingProps) {
  return (
    <Heading lineHeight={1.1} fontWeight={600} fontSize={'5xl'} {...props} />
  );
}

export function FormLabelText(props: TextProps) {
  return <Text fontSize={'xl'} fontWeight={'bold'} {...props} />;
}

export function FormValueText(props: TextProps) {
  return <Text fontSize={'xl'} {...props} />;
}
