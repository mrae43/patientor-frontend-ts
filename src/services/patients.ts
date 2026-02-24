import axios from 'axios';
import {
	EntryFormValuesHealthCheck,
	Patient,
	PatientFormValues,
} from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
	const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

	return data;
};

const create = async (object: PatientFormValues) => {
	const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

	return data;
};

const findById = async (id: string) => {
	const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

	return data;
};

const addNewEntries = async (
	id: string,
	object: EntryFormValuesHealthCheck,
) => {
	const { data } = await axios.post(
		`${apiBaseUrl}/patients/${id}/entries`,
		object,
	);

	return data;
};

export default {
	getAll,
	create,
	findById,
	addNewEntries,
};
