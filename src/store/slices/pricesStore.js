import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPrices } from '../../api/index.js';

const initialState = {
    prices: null,
    loading: false,
};

export const getPrices = createAsyncThunk('prices/getPrices', async () => await fetchPrices());

const pricesStore = createSlice({
    name: 'prices',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getPrices.pending, (state) => {
            state.loading = true;
        })
            .addCase(getPrices.fulfilled, (state, action) => {
                state.loading = false;
                state.prices = action.payload;
            });
    },
});

export default pricesStore.reducer;
