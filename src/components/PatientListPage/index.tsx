import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Paper,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TablePagination,
	Chip,
	Fab,
	Stack,
	Alert,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';

import { PatientFormValues, Patient } from '../../types';
import AddPatientModal from '../AddPatientModal';
import HealthRatingBar from '../HealthRatingBar';
import patientService from '../../services/patients';

interface Props {
	patients: Patient[];
	setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const PatientListPage = ({ patients, setPatients }: Props) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const openModal = (): void => {
		setModalOpen(true);
		setError(null);
	};

	const closeModal = (): void => {
		setModalOpen(false);
		setError(null);
	};

	const submitNewPatient = async (values: PatientFormValues) => {
		try {
			const newPatient = await patientService.create(values);
			setPatients((prev) => [...prev, newPatient]);
			setModalOpen(false);
			setError(null);
		} catch (e: unknown) {
			if (axios.isAxiosError(e)) {
				const message =
					e.response?.data?.error ||
					(typeof e.response?.data === 'string'
						? e.response.data.replace('Something went wrong. Error: ', '')
						: 'Failed to create patient');
				setError(message);
			} else {
				setError('Failed to create patient');
			}
		}
	};

	const handleChangePage = (
		_event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const getGenderChip = (gender: Patient['gender']) => {
		const colorMap: Record<string, 'primary' | 'secondary'> = {
			male: 'primary',
			female: 'secondary',
		};

		return (
			<Chip
				label={gender.toUpperCase()}
				size='small'
				color={colorMap[gender] || 'default'}
			/>
		);
	};

	const paginatedPatients = patients.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage,
	);

	return (
		<Container maxWidth='lg' sx={{ py: 4 }}>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{ mb: 4 }}>
				<Typography variant='h4' component='h1' gutterBottom>
					Patients
				</Typography>
				<Typography variant='h6' color='text.secondary'>
					Total: {patients.length}
				</Typography>
			</Stack>

			{error && (
				<Alert severity='error' onClose={() => setError(null)} sx={{ mb: 3 }}>
					{error}
				</Alert>
			)}

			<Paper elevation={2} sx={{ overflow: 'hidden' }}>
				<TableContainer sx={{ maxHeight: 600 }}>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
									Name
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
									Gender
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
									Occupation
								</TableCell>
								<TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
									Health Rating
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatedPatients.map((patient) => (
								<TableRow
									key={patient.id}
									hover
									sx={{
										cursor: 'pointer',
										'&:hover': { bgcolor: 'action.hover' },
									}}>
									<TableCell>
										<Link
											to={`/patients/${patient.id}`}
											style={{ textDecoration: 'none', color: 'inherit' }}>
											<Typography variant='body1' fontWeight='medium'>
												{patient.name}
											</Typography>
										</Link>
									</TableCell>
									<TableCell>{getGenderChip(patient.gender)}</TableCell>
									<TableCell>
										<Typography variant='body2'>
											{patient.occupation}
										</Typography>
									</TableCell>
									<TableCell>
										<HealthRatingBar showText={false} rating={1} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={patients.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>

			<Fab
				color='primary'
				aria-label='add patient'
				onClick={openModal}
				sx={{
					position: 'fixed',
					bottom: 24,
					right: 24,
					width: 64,
					height: 64,
				}}>
				<AddIcon sx={{ fontSize: 32 }} />
			</Fab>

			<AddPatientModal
				modalOpen={modalOpen}
				onSubmit={submitNewPatient}
				error={error}
				onClose={closeModal}
			/>
		</Container>
	);
};

export default PatientListPage;
