'use client';

import { Button, Flex, Image, Stack } from '@chakra-ui/react';
import { useRef } from 'react';
import { fallbackImageUrl } from '../values';

export interface ImageSelectorProps {
  name?: string;
  url?: string;
  size?: number;
  file?: File | null;
  onSelect: (file?: File | null) => void;
}

export default function ImageSelector(props: ImageSelectorProps) {
  const file = props.file;
  const wantToRemove = file === null;

  const getImageUrl = () => {
    if (file === undefined) {
      return props.url;
    }

    if (wantToRemove) {
      return undefined;
    }

    return URL.createObjectURL(file);
  };
  const imageUrl = getImageUrl();

  const onFileSelect = (files: FileList | null) => {
    if (files) {
      console.log(files[0]);
      props.onSelect(files[0]);
    }
  };

  let negativeButton: React.ReactNode | undefined;

  if (props.url) {
    negativeButton = (
      <Button
        flex={1}
        size="sm"
        colorScheme="red"
        onClick={() => props.onSelect(null)}
      >
        Remove
      </Button>
    );
  }

  if (file || wantToRemove) {
    negativeButton = (
      <Button flex={1} size="sm" onClick={() => props.onSelect(undefined)}>
        Cancel
      </Button>
    );
  }

  const fileInput = useRef<HTMLInputElement | null>(null);

  return (
    <Stack spacing={3} width={props.size} height={props.size}>
      <input
        style={{ display: 'none' }}
        ref={fileInput}
        type="file"
        onChange={(e) => onFileSelect(e.target.files)}
      />

      <Image
        boxSize={props.size}
        objectFit="contain"
        fallbackSrc={fallbackImageUrl}
        src={imageUrl}
      />

      <Flex gap={2}>
        {negativeButton}

        {!wantToRemove && (
          <Button
            flex={1}
            size="sm"
            colorScheme="blue"
            onClick={() => fileInput.current?.click()}
          >
            Select
          </Button>
        )}
      </Flex>
    </Stack>
  );
}
