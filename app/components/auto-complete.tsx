'use client';

import { Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import CurrencyFormat from '../utils/currency-formats';

export interface AutoCompleteSelectItem {
  id: number;
  name: string;
}

export interface AutoCompleteSelectProps {
  id?: string;
  name?: string;
  items: AutoCompleteSelectItem[];
  placeholder?: string;
  isDisabled?: boolean;
  value?: number;
  onChange: (id: number) => void;
}

export function AutoCompleteSelect(props: AutoCompleteSelectProps) {
  const selectedItemName = props.items.find((i) => i.id === props.value)?.name;

  return (
    <AutoComplete
      openOnFocus
      onChange={(value: string) => props.onChange(+value)}
    >
      <AutoCompleteInput
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        variant="filled"
        value={selectedItemName}
        isDisabled={props.isDisabled}
      />
      <AutoCompleteList>
        {props.items.map((item) => (
          <AutoCompleteItem key={item.id} label={item.name} value={item.id} />
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}

interface AutoCompleteItemPreviewProps {
  name: string;
  price: number;
  imageUrl?: string;
}

export function AutoCompleteItemPreview(props: AutoCompleteItemPreviewProps) {
  return (
    <Card
      width="full"
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={props.imageUrl}
        alt={props.name}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{props.name}</Heading>
          <Text>Price: {CurrencyFormat.format(props.price)}</Text>
        </CardBody>
      </Stack>
    </Card>
  );
}
