import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';

export const useIssues = () => {
	const issuesQuery = useQuery({
		queryKey: ['issues'],
		queryFn: getIssues
	});

	console.log(issuesQuery.data);

	return {
		issuesQuery
	};
};
