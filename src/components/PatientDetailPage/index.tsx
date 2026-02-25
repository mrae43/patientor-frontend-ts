import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Female';

import {
	Diagnosis,
	EntryFormValuesHealthCheck,
	EntryType,
	Patient,
} from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import EntryDetails from '../EntryDetails';
import { Alert, Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import axios from 'axios';
import EntryModal from './EntryTypeModal';

const PatientDetailPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [showTypeModal, setShowTypeModal] = useState(false);
	const [selectedType, setSelectedType] = useState<EntryType>();
	const [error, setError] = useState<string | null>(null);
	const params = useParams();
	const id = params.id;

	const handleAddEntry = () => setShowTypeModal(true);

	const handleEntryFormCancel = () => {
		setSelectedType(undefined);
	};

	const handleSubmit = async (values: EntryFormValuesHealthCheck) => {
		if (!id || !patient) return;
		try {
			const newEntry = await patientService.addNewEntries(id, values);
			setPatient({
				...patient,
				entries: [...(patient.entries || []), newEntry],
			});
			setError(null);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				if (e?.response?.data && typeof e?.response?.data === 'string') {
					const message = e.response.data.replace(
						'Something went wrong. Error: ',
						'',
					);
					setError(message);
				} else {
					setError('Unrecognized axios error');
				}
			} else {
				setError('Unknown error');
			}
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
			{!!selectedType && (
				<>
					{error && (
						<Alert severity='error' onClose={() => setError(null)}>
							{error}
						</Alert>
					)}

					<AddEntryForm
						entryType={selectedType}
						onSubmit={handleSubmit}
						onCancel={handleEntryFormCancel}
						onError={setError}
					/>
				</>
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
				onClick={handleAddEntry}>
				ADD NEW ENTRY
			</Button>

			<EntryModal
				showTypeModal={showTypeModal}
				setShowTypeModal={setShowTypeModal}
				setSelectedType={setSelectedType}
			/>
		</div>
	);
};

export default PatientDetailPage;
