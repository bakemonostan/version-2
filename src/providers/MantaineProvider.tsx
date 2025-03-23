"use client";

import { ColorSchemeScript, MantineProvider as MantineProviderBase } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { theme } from "../theme/mantine";

export default function MantineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProviderBase theme={theme}>
      <ColorSchemeScript />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProviderBase>
  );
}
