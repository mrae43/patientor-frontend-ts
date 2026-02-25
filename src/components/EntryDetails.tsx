import {
	Box,
	Card,
	CardContent,
	Typography,
	Chip,
	Divider,
	Avatar,
} from '@mui/material';
import {
	MedicalInformation as MedicalIcon,
	LocalHospital as HospitalIcon,
	Work as WorkIcon,
	HeartBroken as HealthIcon,
} from '@mui/icons-material';
import { Entry, Diagnosis, HealthCheckRating } from '../types';

interface Props {
	entry: Entry;
	diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
	const diagnosisList = entry.diagnosisCodes?.map((code) => {
		const diagnosis = diagnoses.find((d) => d.code === code);
		return (
			<Chip
				key={code}
				label={`${code} ${diagnosis?.name || ''}`}
				size='small'
				variant='outlined'
				sx={{ mr: 1, mb: 1 }}
			/>
		);
	});

	const getRatingChip = (rating: HealthCheckRating) => {
		const colorMap: Record<HealthCheckRating, 'success' | 'warning' | 'error'> =
			{
				[HealthCheckRating.Healthy]: 'success',
				[HealthCheckRating.LowRisk]: 'success',
				[HealthCheckRating.HighRisk]: 'warning',
				[HealthCheckRating.CriticalRisk]: 'error',
			};

		return (
			<Chip
				label={HealthCheckRating[rating]}
				color={colorMap[rating]}
				size='small'
				variant='filled'
			/>
		);
	};

	const renderContent = () => {
		switch (entry.type) {
			case 'Hospital':
				return (
					<>
						<Typography variant='body2' color='text.secondary'>
							<strong>Discharge:</strong> {entry.discharge.date}
						</Typography>
						<Typography variant='body2' sx={{ mb: 2 }}>
							<em>Criteria:</em> {entry.discharge.criteria}
						</Typography>
					</>
				);

			case 'OccupationalHealthcare':
				return (
					<>
						<Typography variant='body2' sx={{ mb: 1 }}>
							<strong>Employer:</strong> {entry.employerName}
						</Typography>
						{entry.sickLeave && (
							<Typography variant='body2' color='text.secondary'>
								<strong>Sick leave:</strong> {entry.sickLeave.startDate} -{' '}
								{entry.sickLeave.endDate}
							</Typography>
						)}
					</>
				);

			case 'HealthCheck':
				return (
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
						{getRatingChip(entry.healthCheckRating)}
					</Box>
				);

			default:
				return null;
		}
	};

	const getAvatarIcon = () => {
		switch (entry.type) {
			case 'HealthCheck':
				return <HealthIcon />;
			case 'Hospital':
				return <HospitalIcon />;
			case 'OccupationalHealthcare':
				return <WorkIcon />;
			default:
				return <MedicalIcon />;
		}
	};

	return (
		<Card sx={{ mb: 2, boxShadow: 1 }}>
			<CardContent sx={{ p: 3 }}>
				{/* Header */}
				<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
					<Avatar sx={{ bgcolor: 'primary.main' }}>{getAvatarIcon()}</Avatar>

					<Box sx={{ flexGrow: 1 }}>
						<Typography variant='h6' component='h3' gutterBottom>
							{entry.date}
						</Typography>
						<Typography variant='body1' color='text.primary' paragraph>
							{entry.description}
						</Typography>
					</Box>
				</Box>

				{/* Type-specific content */}
				{renderContent()}

				{/* Diagnosis Chips */}
				{diagnosisList && diagnosisList.length > 0 && (
					<>
						<Divider sx={{ my: 2 }} />
						<Typography variant='subtitle2' gutterBottom color='text.secondary'>
							Diagnoses:
						</Typography>
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{diagnosisList}
						</Box>
					</>
				)}

				{/* Footer */}
				<Divider sx={{ my: 2 }} />
				<Typography variant='caption' color='text.secondary'>
					Diagnosed by <strong>{entry.specialist}</strong>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default EntryDetails;
