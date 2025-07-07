"use client";

import { EyeIcon, EyeOffIcon, Lock } from "lucide-react";

import { Input } from "./input";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = React.ComponentPropsWithRef<"input"> & {
  placeholder?: string;
};

export function ToggleInputPassword({
  className,
  placeholder,
  ...props
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={cn(`relative`, className)}>
      <Lock className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
      <Input
        className="pl-10"
        {...props}
        placeholder={placeholder}
        id="password"
        type={showPassword ? "text" : "password"}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="top-0 right-4 absolute inset-y-0 flex items-center text-gray-500 hover:text-gray-700"
      >
        {showPassword ? (
          <EyeIcon className="size-4" />
        ) : (
          <EyeOffIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
