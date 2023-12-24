import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';

export interface AutoCompleteSelectItem {
  id: number;
  name: string;
}

export interface AutoCompleteSelectProps<T> {
  items: AutoCompleteSelectItem[];
  selectedId?: number;
  placeholder?: string;
  onSelect: (id: number) => void;
}

export default function AutoCompleteSelect<T>(
  props: AutoCompleteSelectProps<T>,
) {
  // Bug lạ: value của AutoComplete gây lỗi Ke is not iterable khi để selectedId vào.
  const selectedItem = props.items.find((i) => i.name);

  return (
    <AutoComplete
      openOnFocus
      defaultValues={[selectedItem?.name]}
      onChange={(value: string) => props.onSelect(+value)}
    >
      <AutoCompleteInput placeholder={props.placeholder} variant="filled" />
      <AutoCompleteList>
        {props.items.map((item) => (
          <AutoCompleteItem key={item.id} label={item.name} value={item.id} />
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
}
