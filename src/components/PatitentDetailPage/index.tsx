import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Female';

import { Patient } from '../../types';
import patientService from '../../services/patients';

const PatientDetailPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const params = useParams();
	const id = params.id;

	useEffect(() => {
		const fetchPatient = async () => {
			const patient = await patientService.findById(id);

			setPatient(patient);
		};

		void fetchPatient();
	}, [id]);
	return (
		<div className='App'>
			<h3>
				{patient?.name}
				{patient?.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
			</h3>
			<p>ssh: {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
		</div>
	);
};

export default PatientDetailPage;
