import { getProductionFacilities } from '@/app/api/production-facility';
import { LoadingPage } from '@/app/components/spinners';
import { InventoryOrderQueryParams } from '@/app/models/inventory';
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
import { useQuery } from 'react-query';

export interface InventoryOrderSearchPanelProps {
  facilityId: number;
  setFacilityId: (facilityId: number) => void;
  queryParams: InventoryOrderQueryParams;
  setQueryParams: (params: InventoryOrderQueryParams) => void;
}

export default function InventoryOrderSearchPanel(
  props: InventoryOrderSearchPanelProps,
) {
  const queryParams = props.queryParams;
  const setQueryParams = props.setQueryParams;
  const facilityId = props.facilityId;
  const setFacilityId = props.setFacilityId;
  const [searchId, setSearchId] = useState(queryParams.id);

  const onSearchClick = () =>
    setQueryParams({
      ...queryParams,
      id: searchId,
    });

  const { data: facilities } = useQuery({
    queryKey: ['ProductionFacilities'],
    queryFn: () => getProductionFacilities(),
    onSuccess: (resp) => {
      if (resp.length > 0) {
        setFacilityId(resp[0].id);
      }
    },
  });

  if (facilities === undefined) {
    return <LoadingPage />;
  }

  return (
    <Stack spacing={5}>
      <HStack spacing={3}>
        <InputGroup>
          <Input
            placeholder="Enter order ID to search..."
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value ? +e.target.value : undefined)
            }
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
          value={facilityId}
          onChange={(e) => setFacilityId(+e.target.value)}
        >
          {facilities.map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
        </Select>
      </HStack>

      <Checkbox
        isChecked={queryParams.all}
        onChange={() =>
          setQueryParams({ ...queryParams, all: !queryParams.all })
        }
      >
        Display completed
      </Checkbox>
    </Stack>
  );
}
