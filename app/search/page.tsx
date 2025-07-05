import { GuestSearchPage } from '@/components/search';
import { Suspense } from 'react';

const SearchPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<GuestSearchPage />
		</Suspense>
	);
};

export default SearchPage;
