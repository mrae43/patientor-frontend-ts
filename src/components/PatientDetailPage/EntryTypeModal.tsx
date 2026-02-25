import {
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	IconButton,
	Modal,
	Typography,
} from '@mui/material';
import {
	Close as CloseIcon,
	HealthAndSafety as HealthAndSafetyIcon,
	LocalHospital as LocalHospitalIcon,
	Work as WorkIcon,
} from '@mui/icons-material';
import { EntryType } from '../../types';

interface Props {
	showTypeModal: boolean;
	setShowTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedType: (type: EntryType) => void;
}

const EntryModal = ({
	showTypeModal,
	setShowTypeModal,
	setSelectedType,
}: Props) => {
	return (
		<Modal
			open={showTypeModal}
			onClose={() => setShowTypeModal(false)}
			aria-labelledby='modal-title'
			aria-describedby='modal-description'>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: { xs: '90vw', sm: 400 },
					maxWidth: 450,
					maxHeight: '90vh',
					bgcolor: 'background.paper',
					boxShadow: 24,
					borderRadius: 2,
					p: { xs: 3, sm: 4 },
					overflowY: 'auto',
				}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						mb: 3,
					}}>
					<Typography id='modal-title' variant='h5' component='h3'>
						Add New Entry
					</Typography>
					<IconButton
						aria-label='close'
						onClick={() => setShowTypeModal(false)}
						size='small'>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Card
						onClick={() => {
							setSelectedType('HealthCheck');
							setShowTypeModal(false);
						}}
						sx={{
							cursor: 'pointer',
							'&:hover': { boxShadow: 4 },
							transition: 'all 0.2s ease',
						}}>
						<CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<HealthAndSafetyIcon color='primary' />
								<Box>
									<Typography variant='h6'>HealthCheck</Typography>
									<Typography variant='body2' color='text.secondary'>
										Rating 0-3 (Healthy → Critical)
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>

					<Card
						onClick={() => {
							setSelectedType('Hospital');
							setShowTypeModal(false);
						}}
						sx={{
							cursor: 'pointer',
							'&:hover': { boxShadow: 4 },
							transition: 'all 0.2s ease',
						}}>
						<CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<LocalHospitalIcon color='error' />
								<Box>
									<Typography variant='h6'>Hospital</Typography>
									<Typography variant='body2' color='text.secondary'>
										Discharge date & criteria
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>

					<Card
						onClick={() => {
							setSelectedType('OccupationalHealthcare');
							setShowTypeModal(false);
						}}
						sx={{
							cursor: 'pointer',
							'&:hover': { boxShadow: 4 },
							transition: 'all 0.2s ease',
						}}>
						<CardContent>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
								<WorkIcon color='success' />
								<Box>
									<Typography variant='h6'>Occupational Healthcare</Typography>
									<Typography variant='body2' color='text.secondary'>
										Employer + optional sick leave
									</Typography>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Box>

				<Divider sx={{ my: 3 }} />
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button
						variant='outlined'
						onClick={() => setShowTypeModal(false)}
						sx={{ mr: 1 }}>
						Cancel
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default EntryModal;
