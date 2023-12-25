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
  items: AutoCompleteSelectItem[];
  selectedId?: number;
  placeholder?: string;
  isDisabled?: boolean;
  onSelect: (id: number) => void;
}

export function AutoCompleteSelect(props: AutoCompleteSelectProps) {
  // Bug lạ: value của AutoComplete gây lỗi Ke is not iterable khi để selectedId vào.
  const selectedItem = props.items.find((i) => i.name);

  return (
    <AutoComplete
      openOnFocus
      defaultValues={[selectedItem?.name]}
      onChange={(value: string) => props.onSelect(+value)}
    >
      <AutoCompleteInput
        placeholder={props.placeholder}
        variant="filled"
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
