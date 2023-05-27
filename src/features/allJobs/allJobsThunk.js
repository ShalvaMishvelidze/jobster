import customFetch from '../../utils/axios';

export const getAllJobsThunk = async (_, thunkAPI) => {
	const { searchStatus, search, searchType, sort, page, numOfPages } =
		thunkAPI.getState().allJobs;
	let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&${
		search ? `search=${search}` : ''
	}&${numOfPages > 1 ? `page=${page}` : ''}`;

	try {
		const response = await customFetch.get(url);
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('There was an error');
	}
};

export const showStatsThunk = async (_, thunkAPI) => {
	try {
		const response = await customFetch.get('/jobs/stats');
		return response.data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response.data.msg);
	}
};
