import { Box, Button, Modal } from '@mui/material';
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
		<Modal open={showTypeModal} onClose={() => setShowTypeModal(false)}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					p: 4,
				}}>
				<h3>Add New Entry</h3>
				<Button
					fullWidth
					sx={{ mb: 1 }}
					onClick={() => {
						setSelectedType('HealthCheck');
						setShowTypeModal(false);
					}}>
					HealthCheck
				</Button>
				<Button
					fullWidth
					sx={{ mb: 1 }}
					onClick={() => {
						setSelectedType('Hospital');
						setShowTypeModal(false);
					}}>
					Hospital
				</Button>
				<Button
					fullWidth
					onClick={() => {
						setSelectedType('OccupationalHealthcare');
						setShowTypeModal(false);
					}}>
					Occupational Healthcare
				</Button>
			</Box>
		</Modal>
	);
};

export default EntryModal;
