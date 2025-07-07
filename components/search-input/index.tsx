"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";

type Props = {
  placeholder: string;
  searchText: string;
  setSearchText: (text: string) => void;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  inputClassName?: string;
};

export const SearchInput = ({
  searchText,
  setSearchText,
  onBlur,
  onFocus,
  placeholder,
  className,
  inputClassName,
}: Props) => {
  const [spellCheck, setSpellCheck] = useState<boolean | undefined>(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, setSearch] = useState(searchText);

  const handleSearch = useDebounceCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      setSearch(search);
      setSearchText(search);
      params.set("search", search);
    } else {
      setSearch("");
      setSearchText("");
      params.delete("search");
    }
    router.replace(` ${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  useEffect(() => {
    setSpellCheck(true);
  }, []);

  return (
    <div
      className={cn(`relative w-full sm:w-auto search-container`, className)}
    >
      <Search className="top-2.5 left-2.5 absolute w-4 h-4 text-muted-foreground" />
      <Input
        data-ms-editor="true"
        spellCheck={spellCheck}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        className={cn(
          `pl-8 w-full sm:w-[300px] rounded-lg pr-4 focus:border-none focus:outline-none focus:ring-0 focus:ring-transparent focus:shadow-sm border-none`,
          inputClassName,
        )}
      />
    </div>
  );
};
