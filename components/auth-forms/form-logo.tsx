import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement>;
export function FormLogo({ className, ...props }: Props) {
    return (
        <div className={cn('mx-auto', className)} {...props}>
            <picture>
                <img
                    src="/form-logo.png"
                    alt="MediDirect"
                    className="w-12 h-12 object-cover"
                />
            </picture>
        </div>
    );
}
