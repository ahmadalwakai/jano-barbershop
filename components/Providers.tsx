"use client";

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f7f1db" },
          100: { value: "#ecddb2" },
          200: { value: "#e1c989" },
          300: { value: "#d7b560" },
          400: { value: "#C9A84C" },
          500: { value: "#a6873c" },
          600: { value: "#84672d" },
          700: { value: "#62471f" },
          800: { value: "#3f2810" },
          900: { value: "#1f1306" },
        },
        charcoal: {
          500: { value: "#1A1A1A" },
        },
      },
      fonts: {
        heading: { value: "var(--font-playfair)" },
        body: { value: "var(--font-inter)" },
      },
    },
  },
});

const system = createSystem(defaultConfig, customConfig);

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
}
