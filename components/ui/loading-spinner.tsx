import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithRef<"div">;

export function LoadingSpinner({ className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        `border-gray-900 flex items-center justify-center border-t-2 border-b-2 rounded-full w-8 h-8 animate-spin mx-auto`,
        className,
      )}
    />
  );
}
