import { TableBody, TableCell, TableRow } from "../ui/table";

import { Skeleton } from "../ui/skeleton";

export function TableSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <>
            {Array.from({ length: columns }).map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="w-full h-4" />
              </TableCell>
            ))}
          </>
        </TableRow>
      ))}
    </TableBody>
  );
}
