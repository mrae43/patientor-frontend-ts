import { SyntheticEvent, useState } from 'react';
import { EntryFormValues, EntryType, HealthCheckRating } from '../../types';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

interface Props {
	entryType: EntryType;
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const AddEntryForm = ({ entryType, onSubmit, onCancel }: Props) => {
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
	const [dischargeDate, setDischargeDate] = useState('');
	const [dischargeCriteria, setDischargeCriteria] = useState('');

	const addEntry = (event: SyntheticEvent) => {
		event.preventDefault();

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
		<Box
			component='form'
			sx={{
				p: 3,
				border: '1px solid #e0e0e0',
				borderRadius: 2,
				bgcolor: 'background.paper',
				boxShadow: 1,
			}}
			onSubmit={addEntry}>
			<Typography variant='h6' gutterBottom>
				New {entryType.charAt(0).toUpperCase() + entryType.slice(1)} Entry
			</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label='Description'
						variant='filled'
						value={description}
						onChange={({ target }) => setDescription(target.value)}
						required
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label='Date'
						type='date'
						variant='filled'
						value={date}
						onChange={({ target }) => setDate(target.value)}
						required
						InputLabelProps={{ shrink: true }}
					/>
				</Grid>

				<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						label='Specialist'
						variant='filled'
						value={specialist}
						onChange={({ target }) => setSpecialist(target.value)}
						required
					/>
				</Grid>

				{/* Type-Specific Fields */}
				{entryType === 'HealthCheck' && (
					<Grid item xs={12}>
						<TextField
							fullWidth
							label='HealthCheck Rating'
							type='number'
							variant='filled'
							value={healthCheckRating}
							onChange={({ target }) =>
								setHealthCheckRating(Number(target.value) as HealthCheckRating)
							}
							inputProps={{ min: 0, max: 3 }}
							required
							helperText='0=Healthy, 1=LowRisk, 2=HighRisk, 3=CriticalRisk'
						/>
					</Grid>
				)}

				{entryType === 'Hospital' && (
					<>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Discharge Date'
								type='date'
								variant='filled'
								value={dischargeDate}
								onChange={({ target }) => setDischargeDate(target.value)}
								required
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Discharge Criteria'
								variant='filled'
								value={dischargeCriteria}
								onChange={({ target }) => setDischargeCriteria(target.value)}
								required
							/>
						</Grid>
					</>
				)}

				{entryType === 'OccupationalHealthcare' && (
					<>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label='Employer Name'
								variant='filled'
								value={employerName}
								onChange={({ target }) => setEmployerName(target.value)}
								required
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Sick Leave Start'
								type='date'
								variant='filled'
								value={sickLeaveStart}
								onChange={({ target }) => setSickLeaveStart(target.value)}
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								fullWidth
								label='Sick Leave End'
								type='date'
								variant='filled'
								value={sickLeaveEnd}
								onChange={({ target }) => setSickLeaveEnd(target.value)}
								InputLabelProps={{ shrink: true }}
							/>
						</Grid>
					</>
				)}

				{/* Diagnosis Codes - Always last */}
				<Grid item xs={12}>
					<TextField
						fullWidth
						label='Diagnosis Codes (optional)'
						placeholder='Z57.1, N30.0'
						variant='filled'
						value={diagnosisCodes.join(', ')}
						onChange={({ target }) =>
							setDiagnosisCodes(
								target.value
									.split(',')
									.map((s) => s.trim())
									.filter(Boolean),
							)
						}
						helperText='Comma-separated codes'
					/>
				</Grid>
			</Grid>

			{/* Action Buttons */}
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
				<Button
					variant='outlined'
					color='error'
					onClick={onCancel}
					sx={{ minWidth: 100 }}>
					Cancel
				</Button>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					sx={{ minWidth: 100 }}>
					Add Entry
				</Button>
			</Box>
		</Box>
	);
};

export default AddEntryForm;
