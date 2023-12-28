import {
  EventAddDialog,
  EventAddDialogResult,
  EventAddDialogTypeOption,
} from '@/app/components/events';
import { ProductionOrderEventAddDialogResult } from '@/app/components/order-events';
import { ProductionOrderEventOption } from '@/app/models/production-order';
import { DialogProps } from '@/app/types/dialog-props';

export interface ProductionOrderEventAddDialogProps extends DialogProps {
  onSubmit: (result: ProductionOrderEventAddDialogResult) => void;
}

export function ProductionOrderEventAddDialog(
  props: ProductionOrderEventAddDialogProps,
) {
  const typeOptions: EventAddDialogTypeOption[] = [
    { name: 'Interrupted', displayName: 'Interrupted' },
    { name: 'StageDone', displayName: 'Stage Done' },
  ];

  const onSubmit = ({ type, ...params }: EventAddDialogResult) => {
    props.onSubmit({ ...params, type: type as ProductionOrderEventOption });
  };

  return (
    <EventAddDialog
      typeOptions={typeOptions}
      defaultTypeOption="StageDone"
      onSubmit={onSubmit}
      isLoading={props.isLoading}
      display={props.display}
      onClose={props.onClose}
    />
  );
}
