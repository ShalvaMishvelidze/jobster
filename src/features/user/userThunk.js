import customFetch from '../../utils/axios';
import { clearAllJobsState } from '../allJobs/allJobsSlice';
import { logoutUser } from './userSlice';
import { clearValues } from '../job/jobSlice';

export const registerUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.post(url, user);
		return response.data;
	} catch (err) {
		return checkForUnauthorizedResponse(err, thunkAPI);
	}
};

export const loginUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.post(url, user);
		return response.data;
	} catch (err) {
		return checkForUnauthorizedResponse(err, thunkAPI);
	}
};
export const updateUserThunk = async (url, user, thunkAPI) => {
	try {
		const response = await customFetch.patch(url, user);
		return response.data;
	} catch (err) {
		return checkForUnauthorizedResponse(err, thunkAPI);
	}
};

export const clearStoreThunk = async (message, thunkAPI) => {
	try {
		thunkAPI.dispatch(logoutUser(message));
		thunkAPI.dispatch(clearAllJobsState());
		thunkAPI.dispatch(clearValues());
		return Promise.resolve();
	} catch (_) {
		return Promise.reject();
	}
};
