'use client';
import { Flex, FormControl, FormHelperText, FormLabel } from '@chakra-ui/react';
import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

export default function AutoCompleteBox() {
  return (
    <Flex w="full" direction="column">
      <FormControl id="email" w="60">
        <AutoComplete
          openOnFocus
          multiple
          onChange={(vals) => console.log(vals)}
        >
          <AutoCompleteInput variant="filled">
            {({ tags }) =>
              tags.map((tag, tid) => (
                <AutoCompleteTag
                  key={tid}
                  label={tag.label}
                  onRemove={tag.onRemove}
                />
              ))
            }
          </AutoCompleteInput>
          <AutoCompleteList>
            {options.map((option, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={option}
                textTransform="capitalize"
                _selected={{ bg: 'whiteAlpha.50' }}
                _focus={{ bg: 'whiteAlpha.100' }}
              >
                {option}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
      </FormControl>
    </Flex>
  );
}
