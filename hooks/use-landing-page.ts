import { useEffect, useState } from "react";

export function useLandingPage() {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const handleScroll = () => {
    setSticky(window.scrollY >= 400);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sticky]);

  return { open, setOpen, sticky };
}
