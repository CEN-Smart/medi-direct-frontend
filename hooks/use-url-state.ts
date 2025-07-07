import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export function tabConstructor(tab: string) {
  return tab
    .normalize("NFD")
    .split(" ")
    .join("-")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\-]+/g, "-")
    .toLocaleLowerCase();
}

export function useTabState<T extends string>(
  initialState: T,
  tabName: string,
) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pathname = usePathname();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );
  const activeTab = params.get(tabName) ?? tabConstructor(initialState);

  useEffect(() => {
    if (!params.get(tabName)) {
      params.set(tabName, tabConstructor(activeTab));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, params, router, activeTab, tabName]);

  const handleTabChange = (tab: string) => {
    params.set(tabName, tabConstructor(tab));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    activeTab,
    handleTabChange,
  };
}
