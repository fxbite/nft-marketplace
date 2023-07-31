'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { theme } from '@/config/theme';

interface IProps {
  children: React.ReactNode;
}

export function Providers({ children }: IProps) {
  return (
    <CacheProvider>
      <ColorModeScript initialColorMode="dark" />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
