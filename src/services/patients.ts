import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl, baseApiUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${baseApiUrl}/patients`, object);

	return data;
};

export default {
	getAll,
	create,
};
