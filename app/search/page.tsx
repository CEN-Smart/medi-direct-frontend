import { GuestSearchPage } from '@/components/search';
import { Suspense } from 'react';

const SearchPage = () => {
	return (
		<Suspense>
			<GuestSearchPage />
		</Suspense>
	);
};

export default SearchPage;
