import { useEffect, useState } from "react";
import theme from "tailwindcss/defaultTheme";
import { useMediaQuery } from "usehooks-ts";

interface ScreenSizeProps {
  screenSize: keyof typeof theme.screens;
}

interface ScreenSizeState {
  isMobile: boolean;
  isMobileMounted: boolean;
}

export function useScreenSize({
  screenSize,
}: ScreenSizeProps): ScreenSizeState {
  const isMobile = useMediaQuery(`(max-width: ${theme.screens[screenSize]})`);
  const [isMobileMounted, setIsMobileMounted] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMobile) {
        setIsMobileMounted(true);
      }
    }
  }, [isMobile]);
  return { isMobile, isMobileMounted };
}
