import { Card } from "./card";

type Props = {
  message: string;
};

export function NoDataFound({ message }: Props) {
  return (
    <Card className="flex flex-col justify-center items-center mx-auto py-12 w-full h-full">
      <p className="px-2 text-gray-500 text-center">{message}</p>
      <picture>
        <img
          src="/no-data.svg"
          alt="No data found"
          className="mt-4 w-32 h-32 object-cover"
        />
      </picture>
    </Card>
  );
}
