import { SyntheticEvent, useState } from 'react';
import { EntryFormValues, EntryType, HealthCheckRating } from '../../types';
import { Box, Button, TextField } from '@mui/material';

interface Props {
	entryType: EntryType;
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
	onError: (error: string | null) => void;
}

const AddEntryForm = ({ entryType, onSubmit, onCancel, onError }: Props) => {
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [specialist, setSpecialist] = useState('');
	const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

	const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
		HealthCheckRating.Healthy,
	);
	const [employerName, setEmployerName] = useState('');
	const [sickLeaveStart, setSickLeaveStart] = useState('');
	const [sickLeaveEnd, setSickLeaveEnd] = useState('');
	const [dischargeDate, setDisChargeDate] = useState('');
	const [dischargeCriteria, setDisChargeCriteria] = useState('');

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();
		if (!date || !description || !specialist) {
			onError('All fields except diagnosis codes are required');
			return;
		}
		if (
			entryType === 'HealthCheck' &&
			!Object.values(HealthCheckRating).includes(healthCheckRating)
		) {
			onError('HealthCheck rating must be 0-3');
			return;
		}

		if (entryType === 'OccupationalHealthcare' && !employerName) {
			onError('Employer name required');
			return;
		}

		if (entryType === 'Hospital' && (!dischargeDate || !dischargeCriteria)) {
			onError('Discharge date and criteria required');
			return;
		}
		onError(null);
		const baseValues = {
			date,
			description,
			diagnosisCodes,
			specialist,
		};

		let values: EntryFormValues;

		switch (entryType) {
			case 'HealthCheck':
				values = {
					...baseValues,
					type: 'HealthCheck',
					healthCheckRating,
				};
				break;
			case 'Hospital':
				values = {
					...baseValues,
					type: 'Hospital',
					discharge: { date: dischargeDate, criteria: dischargeCriteria },
				};
				break;
			case 'OccupationalHealthcare':
				values = {
					...baseValues,
					type: 'OccupationalHealthcare',
					employerName,
					sickLeave:
						sickLeaveStart && sickLeaveEnd
							? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
							: undefined,
				};
				break;
			default:
				throw new Error('Unsupported Entry type');
		}

		onSubmit(values);
	};

	return (
		<Box component='section' sx={{ p: 2, border: '1px dashed grey' }}>
			<h3>New {entryType} entry</h3>
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
