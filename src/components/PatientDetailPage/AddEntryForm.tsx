import { SyntheticEvent, useState } from 'react';
import { EntryFormValuesHealthCheck, HealthCheckRating } from '../../types';
import { Box, Button, TextField } from '@mui/material';

interface Props {
	onSubmit: (values: EntryFormValuesHealthCheck) => void;
	onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
		HealthCheckRating.Healthy,
	);
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({
			date,
			description,
			diagnosisCodes,
			specialist,
			healthCheckRating,
			type: 'HealthCheck',
		});
	};

	return (
		<Box component='section' sx={{ p: 2, border: '1px dashed grey' }}>
			<h3>New HealthCheck entry</h3>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
				}}>
				<form onSubmit={addEntry}>
					<TextField
						id='description1'
						label='Description'
						variant='filled'
						type='text'
						value={description}
						onChange={({ target }) => setDescription(target.value)}
						fullWidth
					/>
					<TextField
						label='Date'
						placeholder='YYYY-MM-DD'
						variant='filled'
						value={date}
						onChange={({ target }) => setDate(target.value)}
						fullWidth
					/>
					<TextField
						label='Specialist'
						variant='filled'
						type='text'
						value={specialist}
						onChange={({ target }) => setSpecialist(target.value)}
						fullWidth
					/>
					<TextField
						label='Healthcheck rating'
						placeholder='0-1-2-3'
						variant='filled'
						type='number'
						value={healthCheckRating}
						onChange={({ target }) =>
							setHealthCheckRating(Number(target.value) as HealthCheckRating)
						}
						fullWidth
					/>
					<TextField
						label='Diagnosis Code'
						placeholder='Z57.1, N30.0'
						variant='filled'
						type='text'
						value={diagnosisCodes.join(', ')}
						onChange={({ target }) =>
							setDiagnosisCodes(target.value.split(','))
						}
						fullWidth
					/>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Button variant='contained' color='error' onClick={onCancel}>
							Cancel
						</Button>
						<Button variant='contained' color='inherit' type='submit'>
							ADD
						</Button>
					</div>
				</form>
			</div>
		</Box>
	);
};

export default AddEntryForm;
