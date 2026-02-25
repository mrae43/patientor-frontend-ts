import { useMemo } from 'react';
import { Box, Rating, Typography, Chip } from '@mui/material';
import {
	Favorite as HeartIcon,
	HeartBroken as BrokenHeartIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { HealthCheckRating } from '../types';

type BarProps = {
	rating: HealthCheckRating;
	showText?: boolean;
};

const StyledRating = styled(Rating)(() => ({
	'& .MuiRating-iconFilled': {
		color: '#4caf50',
	},
	'& .MuiRating-iconHover': {
		color: '#ff9800',
	},
}));

const HEALTHBAR_TEXTS: Record<HealthCheckRating, string> = {
	[HealthCheckRating.Healthy]: 'Excellent health',
	[HealthCheckRating.LowRisk]: 'Low risk',
	[HealthCheckRating.HighRisk]: 'High risk',
	[HealthCheckRating.CriticalRisk]: 'Critical condition',
};

const HealthRatingBar = ({ rating, showText = false }: BarProps) => {
	const ratingColor = useMemo(() => {
		switch (rating) {
			case HealthCheckRating.Healthy:
				return 'success';
			case HealthCheckRating.LowRisk:
				return 'success';
			case HealthCheckRating.HighRisk:
				return 'warning';
			case HealthCheckRating.CriticalRisk:
				return 'error';
			default:
				return 'default';
		}
	}, [rating]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				gap: 1,
			}}>
			<StyledRating
				readOnly
				value={4 - rating}
				max={4}
				icon={<HeartIcon fontSize='small' />}
				emptyIcon={<BrokenHeartIcon fontSize='small' />}
				sx={{ fontSize: '1.2rem' }}
			/>

			<Chip
				label={HEALTHBAR_TEXTS[rating]}
				size='small'
				color={ratingColor}
				variant='filled'
				sx={{ fontSize: '0.75rem', fontWeight: 500 }}
			/>

			{showText && (
				<Typography variant='caption' color='text.secondary' align='center'>
					{HEALTHBAR_TEXTS[rating]}
				</Typography>
			)}
		</Box>
	);
};

export default HealthRatingBar;
