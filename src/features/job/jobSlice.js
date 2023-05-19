import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { logoutUser } from '../user/userSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';

const initialState = {
	isLoading: false,
	position: '',
	company: '',
	jobLocation: '',
	jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
	jobType: 'full-time',
	statusOptions: ['interview', 'declined', 'pending'],
	status: 'pending',
	isEditing: false,
	editJob: '',
};

export const createJob = createAsyncThunk(
	'job/createJob',
	async (job, thunkAPI) => {
		try {
			const response = await customFetch.post('/jobs', job, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});
			thunkAPI.dispatch(clearValues());
			return response.data;
		} catch (err) {
			if (err.response.status === 401) {
				thunkAPI.dispatch(logoutUser());
				return thunkAPI.rejectWithValue('Unauthorized! Logging Out...');
			}
			return thunkAPI.rejectWithValue(err.response.data.msg);
		}
	}
);

export const deleteJob = createAsyncThunk(
	'job/deleteJob',
	async (jobId, thunkAPI) => {
		thunkAPI.dispatch(showLoading());
		try {
			const response = await customFetch.delete(`/jobs/${jobId}`, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});
			thunkAPI.dispatch(getAllJobs());
			return response.data.msg;
		} catch (err) {
			thunkAPI.dispatch(hideLoading());
			return thunkAPI.rejectWithValue(err.response.data.msg);
		}
	}
);

export const editJob = createAsyncThunk(
	'job/editJob',
	async ({ jobId, job }, thunkAPI) => {
		try {
			const response = await customFetch.patch(`/jobs/${jobId}`, job, {
				headers: {
					authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
				},
			});
			thunkAPI.dispatch(clearValues());
			return response.data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.response.data.msg);
		}
	}
);

const jobSlice = createSlice({
	name: 'job',
	initialState,
	reducers: {
		handleChange: (state, { payload: { name, value } }) => {
			state[name] = value;
		},
		clearValues: () => {
			return {
				...initialState,
				jobLocation: getUserFromLocalStorage()?.location || '',
			};
		},
		setEditJob: (state, { payload }) => {
			return { ...state, isEditing: true, ...payload };
		},
	},
	extraReducers: {
		[createJob.pending]: (state) => {
			state.isLoading = true;
		},
		[createJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success('Job Created');
		},
		[createJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
		[deleteJob.fulfilled]: (_, { payload }) => {
			toast.success(payload);
		},
		[deleteJob.rejected]: (_, { payload }) => {
			toast.error(payload);
		},
		[editJob.pending]: (state) => {
			state.isLoading = true;
		},
		[editJob.fulfilled]: (state) => {
			state.isLoading = false;
			toast.success('Job Modified');
		},
		[editJob.rejected]: (state, { payload }) => {
			state.isLoading = false;
			toast.error(payload);
		},
	},
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;

export default jobSlice.reducer;
