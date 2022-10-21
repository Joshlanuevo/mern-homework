import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import homeworkService from './homeworkService';

const initialState = {
    homeworks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new homework
export const createHomework = createAsyncThunk('homeworks/create', 
    async (homeworkData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await homeworkService.createHomework(homeworkData, token);
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

// Get user homeworks
export const getHomeworks = createAsyncThunk(
    'homeworks/getAll', 
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await homeworkService.getHomework(token);
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

// Update user homework
export const updateHomework = createAsyncThunk('homeworks/update', 
    async (homeworkData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await homeworkService.updateHomework(homeworkData, token);
        } catch (error) {
            const message = 
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
             return thunkAPI.rejectWithValue(message)
        }
    }
);

// Delete user homework
export const deleteHomework = createAsyncThunk('homeworks/delete', 
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await homeworkService.deleteHomework(id, token);
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);

export const homeworkSlice = createSlice({
    name: 'homeworks',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder 
            .addCase(createHomework.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createHomework.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.homeworks.push(action.payload);
            })
            .addCase(createHomework.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getHomeworks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getHomeworks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.homeworks = action.payload;
            })
            .addCase(getHomeworks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateHomework.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateHomework.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.homeworks = state.homeworks.filter((homework) => homework._id !== action.payload._id)
                state.homeworks.push(action.payload)
            })
            .addCase(updateHomework.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteHomework.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteHomework.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.homeworks = state.homeworks.filter((homework) => homework._id !== action.payload.id);
            })
            .addCase(deleteHomework.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = homeworkSlice.actions;
export default homeworkSlice.reducer;