import axios from 'axios';
import { Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
	const response = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
	return response.data;
};

export default { getAllDiagnoses };
