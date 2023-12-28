import { UseToastOptions } from '@chakra-ui/react';

export interface AppToastOptions extends UseToastOptions {
  title?: string;
}

export function showSuccessToast(
  toast: (options: UseToastOptions) => void,
  options?: AppToastOptions,
) {
  toast({
    title: options?.title ?? 'Operation succeed!',
    status: 'success',
    duration: 2000,
    ...options,
  });
}

export function showFailToast(
  toast: (options: UseToastOptions) => void,
  options?: AppToastOptions,
) {
  toast({
    title: options?.title ?? 'Operation failed!',
    status: 'error',
    duration: 2000,
    ...options,
  });
}
