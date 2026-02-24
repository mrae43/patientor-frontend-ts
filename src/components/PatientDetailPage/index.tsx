import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Female';

import { Diagnosis, EntryFormValuesHealthCheck, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import EntryDetails from '../EntryDetails';
import { Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';

const PatientDetailPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [showEntryForm, setShowEntryForm] = useState(false);
	const params = useParams();
	const id = params.id;

	const handleEntryForm = () => {
		setShowEntryForm((prev) => !prev);
	};

	const handleSubmit = async (values: EntryFormValuesHealthCheck) => {
		if (!id || !patient) return;
		try {
			const newEntry = await patientService.addNewEntries(id, values);
			setPatient({
				...patient,
				entries: [...(patient.entries || []), newEntry], // 👈 Merge locally
			});
			setShowEntryForm(false);
		} catch (error) {
			console.log(error);
		}
	};

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
				<AddEntryForm onSubmit={handleSubmit} onCancel={handleEntryForm} />
			)}
			<div>
				<h3>entries</h3>
				{patient?.entries.map((entry) => (
					<EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
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
