import { CardHeader, CardTitle } from '../ui/card';
import { FormLogo } from './form-logo';

interface Props {
    title: string;
    description: string;
}

export function FormHeader({ title, description }: Props) {
    return (
        <CardHeader className="pb-6 text-center">
            <FormLogo />
            <CardTitle className="font-bold text-gray-900 text-2xl">
                {title}
            </CardTitle>
            <p className="text-gray-600">{description}</p>
        </CardHeader>
    );
}
