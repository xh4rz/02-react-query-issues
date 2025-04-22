import { IssueItem } from './IssueItem';
import { GithubIssue, State } from '../interfaces/issue.interface';
import { FC } from 'react';

interface Props {
	issues: GithubIssue[];
	onStateChange: (state: State) => void;
	state: State;
}

export const IssueList: FC<Props> = ({ issues, onStateChange, state }) => {
	return (
		<>
			{/* Botones de All, Open, Closed */}
			<div className="flex gap-4">
				<button
					onClick={() => onStateChange(State.All)}
					className={`btn ${state === State.All ? 'active' : ''}`}
				>
					All
				</button>
				<button
					onClick={() => onStateChange(State.Open)}
					className={`btn ${state === State.Open ? 'active' : ''}`}
				>
					Open
				</button>
				<button
					onClick={() => onStateChange(State.Close)}
					className={`btn ${state === State.Close ? 'active' : ''}`}
				>
					Closed
				</button>
			</div>

			{/* Lista de issues */}
			<div className="mt-4">
				{issues.map((issue) => (
					<IssueItem key={issue.id} issue={issue} />
				))}
			</div>
		</>
	);
};
