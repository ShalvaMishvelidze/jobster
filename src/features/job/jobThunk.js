import { logoutUser } from '../user/userSlice';
import customFetch from '../../utils/axios';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
	try {
		const response = await customFetch.post('/jobs', job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (err) {
		if (err.response.status === 401) {
			thunkAPI.dispatch(logoutUser());
			return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
		}
		return thunkAPI.rejectWithValue(err.response.data.msg);
	}
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
	thunkAPI.dispatch(showLoading());
	try {
		const response = await customFetch.delete(`/jobs/${jobId}`);
		thunkAPI.dispatch(getAllJobs());
		return response.data.msg;
	} catch (err) {
		thunkAPI.dispatch(hideLoading());
		return thunkAPI.rejectWithValue(err.response.data.msg);
	}
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
	try {
		const response = await customFetch.patch(`/jobs/${jobId}`, job);
		thunkAPI.dispatch(clearValues());
		return response.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response.data.msg);
	}
};
