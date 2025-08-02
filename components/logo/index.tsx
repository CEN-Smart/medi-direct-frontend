import Image from 'next/image';
import Link from 'next/link';

type Props = {
    src?: string;
};

export function Logo({ src }: Props) {
    return (
        <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-14 w-64">
                <Image
                    src={src || '/logo.png'}
                    alt="Medi Direct Logo"
                    fill
                    className="object-fit"
                />
            </div>
        </Link>
    );
}
