import { CardHeader, CardTitle } from "../ui/card";

interface Props {
  title: string;
  description: string;
}

export function FormHeader({ title, description }: Props) {
  return (
    <CardHeader className="pb-6 text-center">
      <div className="flex justify-center items-center bg-blue-600 mx-auto mb-4 rounded-lg w-12 h-12">
        <span className="font-bold text-white text-lg">MD</span>
      </div>
      <CardTitle className="font-bold text-gray-900 text-2xl">
        {title}
      </CardTitle>
      <p className="text-gray-600">{description}</p>
    </CardHeader>
  );
}
