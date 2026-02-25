import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Container,
	Paper,
	Typography,
	Box,
	Chip,
	Grid,
	Card,
	CardContent,
	Avatar,
	Stack,
} from '@mui/material';
import {
	Female as FemaleIcon,
	Male as MaleIcon,
	Add as AddIcon,
	Work as WorkIcon,
} from '@mui/icons-material';

import { Diagnosis, EntryFormValues, EntryType, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import EntryDetails from '../EntryDetails';
import { Alert, Button } from '@mui/material';
import AddEntryForm from './AddEntryForm';
import EntryModal from './EntryTypeModal';
import axios from 'axios';

const PatientDetailPage = () => {
	const [patient, setPatient] = useState<Patient | null>(null);
	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [showTypeModal, setShowTypeModal] = useState(false);
	const [selectedType, setSelectedType] = useState<EntryType>();
	const [error, setError] = useState<string | null>(null);
	const params = useParams<{ id: string }>();
	const id = params.id;

	const handleAddEntry = () => setShowTypeModal(true);

	const handleEntryFormCancel = () => {
		setSelectedType(undefined);
		setError(null);
	};

	const handleSubmit = async (values: EntryFormValues) => {
		if (!id || !patient) return;

		try {
			const newEntry = await patientService.addNewEntries(id, values);
			setPatient({
				...patient,
				entries: [...(patient.entries || []), newEntry],
			});
			setSelectedType(undefined);
			setError(null);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				const message =
					e.response?.data?.error ||
					(typeof e.response?.data === 'string'
						? e.response.data.replace('Something went wrong. Error: ', '')
						: 'Validation failed');
				setError(message);
			} else {
				setError('Failed to add entry');
			}
		}
	};

	useEffect(() => {
		if (!id) return;

		const fetchPatient = async () => {
			try {
				const patientData = await patientService.findById(id);
				setPatient(patientData);
			} catch {
				setError('Patient not found');
			}
		};

		const fetchDiagnoses = async () => {
			try {
				const diagnosesData = await diagnoseService.getAllDiagnoses();
				setDiagnoses(diagnosesData);
			} catch {
				console.error('Failed to fetch diagnoses');
			}
		};

		void fetchPatient();
		void fetchDiagnoses();
	}, [id]);

	const getGenderIcon = () => {
		switch (patient?.gender) {
			case 'male':
				return <MaleIcon sx={{ color: 'primary.main' }} />;
			case 'female':
				return <FemaleIcon sx={{ color: 'primary.main' }} />;
			default:
				return null;
		}
	};

	if (!patient) {
		return (
			<Container maxWidth='md' sx={{ mt: 4 }}>
				<Typography variant='h5' color='text.secondary'>
					Loading patient data...
				</Typography>
			</Container>
		);
	}

	return (
		<Container maxWidth='md' sx={{ mt: 4, mb: 6 }}>
			<Card sx={{ mb: 4, boxShadow: 3 }}>
				<CardContent>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
						<Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60 }}>
							<WorkIcon />
						</Avatar>
						<Box>
							<Typography variant='h4' component='h1' gutterBottom>
								{patient.name}
								{getGenderIcon()}
							</Typography>
							<Chip
								label={patient.gender.toUpperCase()}
								color='primary'
								size='small'
								sx={{ mr: 1 }}
							/>
						</Box>
					</Box>

					<Grid container spacing={2} sx={{ mb: 3 }}>
						<Grid item xs={12} sm={4}>
							<Typography variant='subtitle2' color='text.secondary'>
								SSN
							</Typography>
							<Typography variant='body1' fontWeight='medium'>
								{patient.ssn}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography variant='subtitle2' color='text.secondary'>
								Born
							</Typography>
							<Typography variant='body1' fontWeight='medium'>
								{patient.dateOfBirth}
							</Typography>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Typography variant='subtitle2' color='text.secondary'>
								Occupation
							</Typography>
							<Typography variant='body1' fontWeight='medium'>
								{patient.occupation}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>

			<Box sx={{ mb: 4 }}>
				<Button
					startIcon={<AddIcon />}
					variant='contained'
					size='large'
					onClick={handleAddEntry}
					fullWidth
					sx={{ py: 1.5 }}>
					Add New Entry
				</Button>
			</Box>

			{!!selectedType && (
				<Paper elevation={2} sx={{ p: 4, mb: 4 }}>
					{error && (
						<Alert
							severity='error'
							onClose={() => setError(null)}
							sx={{ mb: 3 }}>
							{error}
						</Alert>
					)}
					<AddEntryForm
						entryType={selectedType}
						onSubmit={handleSubmit}
						onCancel={handleEntryFormCancel}
					/>
				</Paper>
			)}

			<EntryModal
				showTypeModal={showTypeModal}
				setShowTypeModal={setShowTypeModal}
				setSelectedType={setSelectedType}
			/>

			<Box>
				<Typography variant='h5' component='h2' gutterBottom sx={{ mb: 3 }}>
					Medical Entries ({patient.entries?.length || 0})
				</Typography>
				<Stack spacing={2}>
					{patient.entries?.length ? (
						patient.entries.map((entry) => (
							<EntryDetails
								key={entry.id}
								entry={entry}
								diagnoses={diagnoses}
							/>
						))
					) : (
						<Paper sx={{ p: 4, textAlign: 'center' }}>
							<Typography variant='body1' color='text.secondary'>
								No medical entries yet. Add one above!
							</Typography>
						</Paper>
					)}
				</Stack>
			</Box>
		</Container>
	);
};

export default PatientDetailPage;
