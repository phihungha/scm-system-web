import { UseToastOptions } from '@chakra-ui/react';

export interface SuccessToastOptions extends UseToastOptions {
  title?: string;
}

export function showSuccessToast(
  toast: (options: UseToastOptions) => void,
  options?: SuccessToastOptions,
) {
  toast({
    title: options?.title ?? 'Operation succeed!',
    status: 'success',
    duration: 2000,
    ...options,
  });
}
