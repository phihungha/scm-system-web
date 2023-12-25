'use client';

import { AbsoluteCenter, Spinner } from '@chakra-ui/react';

export function ButtonSpinner() {
  return <Spinner color="white" />;
}

export function NormalSpinner() {
  return <Spinner color="blue" />;
}

export function LoadingPage() {
  return (
    <AbsoluteCenter>
      <NormalSpinner />
    </AbsoluteCenter>
  );
}
