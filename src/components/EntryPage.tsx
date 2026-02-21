import { Entry, Diagnosis, HealthCheckRating } from '../types';
import Box from '@mui/material/Box';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

interface Props {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
	const diagnosisList = entry.diagnosisCodes?.map((code) => {
		const diagnosis = diagnoses.find((d) => d.code === code);
		return (
			<div key={code}>
				{code}: {diagnosis?.name}
			</div>
		);
	});

	switch (entry.type) {
		case 'Hospital':
			return (
				<Box component='section' sx={{ p: 2, border: '1px solid black' }}>
					<p>
						<strong>{entry.date}</strong> <MedicalInformationIcon />
					</p>
					<p style={{ fontStyle: 'italic' }}>{entry.description}</p>
					<p>discharge: {entry.discharge.date}</p>
					<p>criteria: {entry.discharge.criteria}</p>
					{diagnosisList}
					<p>diagnose by {entry.specialist}</p>
				</Box>
			);

		case 'OccupationalHealthcare':
			return (
				<Box component='section' sx={{ p: 2, border: '1px solid black' }}>
					<p>
						<strong>{entry.date}</strong> <MedicalInformationIcon />
					</p>
					<p style={{ fontStyle: 'italic' }}>{entry.description}</p>
					<p>employer: {entry.employerName}</p>
					{entry.sickLeave && (
						<p>
							sick leave: {entry.sickLeave.startDate} -{' '}
							{entry.sickLeave.endDate}
						</p>
					)}
					{diagnosisList}
					<p>diagnose by {entry.specialist}</p>
				</Box>
			);

		case 'HealthCheck':
			return (
				<Box component='section' sx={{ p: 2, border: '1px solid black' }}>
					<p>
						<strong>{entry.date}</strong> <MedicalInformationIcon />
					</p>
					<p style={{ fontStyle: 'italic' }}>{entry.description}</p>
					<p>
						health check rating: {HealthCheckRating[entry.healthCheckRating]}
					</p>
					{diagnosisList}
					<p>diagnose by {entry.specialist}</p>
				</Box>
			);

		default:
			throw new Error(`Unhandled entry type: ${entry satisfies never}`);
	}
};

export default EntryDetails;
