import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Female';

import { Diagnosis, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import EntryComponent from '../EntryPage';
import { Box, Button, TextField } from '@mui/material';

const PatientDetailPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [showEntryForm, setShowEntryForm] = useState(false);
	const params = useParams();
	const id = params.id;

	const handleEntryForm = () => {
		setShowEntryForm(true);
	};

	const addEntry = () => {};

	useEffect(() => {
		if (!id) {
			return;
		}

		const fetchPatient = async () => {
			const patient = await patientService.findById(id);

			setPatient(patient);
		};

		const fetchDiagnosis = async () => {
			const diagnose = await diagnoseService.getAllDiagnoses();
			setDiagnoses(diagnose);
		};

		void fetchPatient();
		void fetchDiagnosis();
	}, [id]);
	return (
		<div className='App'>
			<h1>
				{patient?.name}
				{patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
			</h1>
			<p>ssh: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
			{showEntryForm && (
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
								fullWidth
							/>
							<TextField
								label='Date'
								placeholder='YYYY-MM-DD'
								variant='filled'
								fullWidth
							/>
							<TextField
								label='Specialist'
								variant='filled'
								type='text'
								fullWidth
							/>
							<TextField
								label='Healthcheck rating'
								placeholder='0-1-2-3'
								variant='filled'
								type='number'
								fullWidth
							/>
							<TextField
								label='Diagnosis Code'
								placeholder='Z57.1, N30.0'
								variant='filled'
								type='text'
								fullWidth
							/>
						</form>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Button
							variant='contained'
							color='error'
							onChange={() => setShowEntryForm(false)}>
							Cancel
						</Button>
						<Button variant='contained' color='inherit' type='submit'>
							ADD
						</Button>
					</div>
				</Box>
			)}
			<div>
				<h3>entries</h3>
				{patient?.entries.map((entry) => (
					<EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</div>
			<Button
				sx={{ mt: '10px' }}
				variant='contained'
				color='primary'
				onClick={handleEntryForm}>
				ADD NEW ENTRY
			</Button>
		</div>
	);
};

export default PatientDetailPage;
