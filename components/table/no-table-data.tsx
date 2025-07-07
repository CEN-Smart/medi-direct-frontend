import { TableBody, TableCell, TableRow } from "../ui/table";

type Props = {
  colSpan: number;
  message?: string;
};
export function NoTableData({ colSpan, message = "No data available" }: Props) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={colSpan}>
          <div className="flex justify-center items-center mx-auto py-4 w-full">
            <p>{message}</p>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
