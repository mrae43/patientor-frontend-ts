import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Female';

import { Diagnosis, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import EntryComponent from '../EntryPage';
import { Button } from '@mui/material';

const PatientDetailPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const params = useParams();
	const id = params.id;

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
			<div>
				<h3>entries</h3>
				{patient?.entries.map((entry) => (
					<EntryComponent key={entry.id} entry={entry} diagnoses={diagnoses} />
				))}
			</div>
			<Button variant='contained' color='primary'>
				ADD NEW ENTRY
			</Button>
		</div>
	);
};

export default PatientDetailPage;
