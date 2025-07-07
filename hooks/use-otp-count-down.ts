import { useEffect, useState } from "react";

export function useOtpCountDown(initialCount = 60) {
  const [countDown, setCountDown] = useState(initialCount);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown((prevCount) => prevCount - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);
  return { countDown, setCountDown };
}
