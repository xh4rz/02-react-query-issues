import { useState } from 'react';
import { LoadingSpinner } from '../../shared/components';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
	const [state, SetState] = useState<State>(State.All);

	const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

	const { issuesQuery, page, nextPage, prevPage } = useIssues({
		state: state,
		selectedLabels: selectedLabels
	});

	const issues = issuesQuery.data ?? [];

	const onLabelSelected = (label: string) => {
		if (selectedLabels.includes(label)) {
			setSelectedLabels(selectedLabels.filter((l) => l !== label));
		} else {
			setSelectedLabels([...selectedLabels, label]);
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
			<div className="col-span-1 sm:col-span-2">
				{issuesQuery.isLoading ? (
					<LoadingSpinner />
				) : (
					<>
						<IssueList issues={issues} onStateChange={SetState} state={state} />

						<div className="flex justify-between items-center">
							<button
								className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
								onClick={prevPage}
							>
								Anteriores
							</button>

							<span>{page}</span>

							<button
								className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all"
								onClick={nextPage}
							>
								Siguientes
							</button>
						</div>
					</>
				)}
			</div>

			<div className="col-span-1 px-2">
				<LabelPicker
					selectedLabels={selectedLabels}
					onLabelSelected={onLabelSelected}
				/>
			</div>
		</div>
	);
};
