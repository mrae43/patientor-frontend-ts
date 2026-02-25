import { SyntheticEvent, useState } from 'react';
import {
	Box,
	Paper,
	Typography,
	TextField,
	Grid,
	Button,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Divider,
} from '@mui/material';
import { PatientFormValues, Gender } from '../../types';

interface Props {
	onCancel: () => void;
	onSubmit: (values: PatientFormValues) => void;
}

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
	const [name, setName] = useState('');
	const [occupation, setOccupation] = useState('');
	const [ssn, setSsn] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [gender, setGender] = useState<Gender>(Gender.Other);

	const addPatient = (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({
			name,
			occupation,
			ssn,
			dateOfBirth,
			gender,
		});
	};

	return (
		<Paper elevation={3} sx={{ p: 4 }}>
			<Typography variant='h5' component='h2' gutterBottom align='center'>
				Add New Patient
			</Typography>

			<Box component='form' onSubmit={addPatient} sx={{ mt: 2 }}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							required
							label='Full Name'
							value={name}
							onChange={({ target }) => setName(target.value)}
							variant='filled'
						/>
					</Grid>

					{/* SSN */}
					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							required
							label='Social Security Number'
							value={ssn}
							onChange={({ target }) => setSsn(target.value)}
							variant='filled'
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							required
							label='Date of Birth'
							type='date'
							value={dateOfBirth}
							onChange={({ target }) => setDateOfBirth(target.value)}
							InputLabelProps={{ shrink: true }}
							variant='filled'
						/>
					</Grid>

					<Grid item xs={12} md={6}>
						<TextField
							fullWidth
							required
							label='Occupation'
							value={occupation}
							onChange={({ target }) => setOccupation(target.value)}
							variant='filled'
						/>
					</Grid>

					<Grid item xs={12}>
						<FormControl fullWidth required variant='filled'>
							<InputLabel>Gender</InputLabel>
							<Select
								value={gender}
								label='Gender'
								onChange={(e) => setGender(e.target.value as Gender)}>
								<MenuItem value={Gender.Male}>Male</MenuItem>
								<MenuItem value={Gender.Female}>Female</MenuItem>
								<MenuItem value={Gender.Other}>Other</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Divider sx={{ my: 4 }} />

				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
					<Button
						variant='outlined'
						color='inherit'
						onClick={onCancel}
						sx={{ minWidth: 120 }}>
						Cancel
					</Button>
					<Button
						type='submit'
						variant='contained'
						color='primary'
						sx={{ minWidth: 120 }}>
						Add Patient
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default AddPatientForm;
