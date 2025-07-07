import { useEffect } from "react";

export const useOpenOverlay = (
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  isMobile: boolean,
) => {
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setIsOpen]);
};
