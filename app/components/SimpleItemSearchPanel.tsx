'use client';

import {
  Checkbox,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import {
  SimpleItemQueryParams,
  SimpleItemSearchCriteria,
} from '../models/general';

export interface SimpleItemSearchPanelProps {
  queryParams: SimpleItemQueryParams;
  setQueryParams: (params: SimpleItemQueryParams) => void;
}

export default function SimpleItemSearchPanel({
  queryParams,
  setQueryParams,
}: SimpleItemSearchPanelProps) {
  const [searchTerm, setSearchTerm] = useState(queryParams.searchTerm);
  const [searchCriteria, setSearchCriteria] = useState(
    queryParams.searchCriteria as string,
  );

  const onSearchClick = () =>
    setQueryParams({
      ...queryParams,
      searchTerm,
      searchCriteria: searchCriteria as SimpleItemSearchCriteria,
    });

  return (
    <Stack spacing={5}>
      <HStack spacing={3}>
        <InputGroup>
          <Input
            placeholder="Enter something to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchClick();
              }
            }}
          />
          <InputRightAddon>
            <IconButton
              mx={5}
              aria-label="Search"
              icon={<FiSearch color="gray.300" />}
              onClick={onSearchClick}
            />
          </InputRightAddon>
        </InputGroup>

        <Select
          w={330}
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
        >
          <option value="Id">ID</option>
          <option value="Name">Name</option>
        </Select>
      </HStack>

      <Checkbox
        isChecked={queryParams.all}
        onChange={() =>
          setQueryParams({ ...queryParams, all: !queryParams.all })
        }
      >
        Display inactive
      </Checkbox>
    </Stack>
  );
}
